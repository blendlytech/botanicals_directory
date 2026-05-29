import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeIAS, scrapeVendorWebsite } from './scrape_ias.mjs';
import { RESEARCHER_SYSTEM_PROMPT, CLOSER_SYSTEM_PROMPT } from './prompts.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google Gen AI client
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('❌ Error: GEMINI_API_KEY or GOOGLE_API_KEY environment variable is missing.');
  console.error('Please make sure it is set in your environment or a .env file.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  console.log('==================================================');
  console.log('🍀 RPV MULTI-AGENT OUTREACH WORKFLOW INITIALIZED 🍀');
  console.log('==================================================');

  // Step 1: Scrape raw text from IAS Expo page
  let rawScrapedText = '';
  try {
    console.log('\n[Phase 1] Scraping IAS Expo Vendors and Sponsors...');
    rawScrapedText = await scrapeIAS();
    console.log(`✅ Scraped successfully! Text length: ${rawScrapedText.length} characters.`);
  } catch (error) {
    console.error('❌ Error during scraping phase:', error);
    process.exit(1);
  }

  // Step 2: Lead Generation Agent (Gemini Flash)
  let vendors = [];
  try {
    console.log('\n[Phase 2] Lead Researcher Agent (Gemini 2.5 Flash) parsing raw data...');
    
    // Call the Flash model to parse the raw text into structured JSON list of vendors
    const researcherResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Here is the raw text from the IAS Expo vendor/sponsor page:\n\n${rawScrapedText}\n\nPlease parse this text and return the list of vendors as JSON.`,
      config: {
        systemInstruction: RESEARCHER_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      }
    });

    const parsedData = JSON.parse(researcherResponse.text);
    vendors = Array.isArray(parsedData) ? parsedData : (parsedData.vendors || []);
    console.log(`✅ Parsed successfully! Extracted ${vendors.length} rare plant vendors.`);
  } catch (error) {
    console.error('❌ Error in Lead Researcher Agent phase:', error);
    console.log('Falling back to a small subset or exiting.');
    process.exit(1);
  }

  if (vendors.length === 0) {
    console.log('⚠️ No vendors were found in the parsed data. Exiting.');
    process.exit(0);
  }

  // Limit processing for the initial run to prevent hitting rate limits and to let the user review a solid seed list
  const maxVendorsToProcess = Math.min(vendors.length, 12);
  console.log(`\n[Phase 3] Closer Agent (Gemini 2.5 Pro) drafting highly personalized pitches for top ${maxVendorsToProcess} vendors...`);
  
  const enrichedVendors = [];

  for (let i = 0; i < maxVendorsToProcess; i++) {
    const vendor = vendors[i];
    console.log(`\n👉 Processing [${i + 1}/${maxVendorsToProcess}] ${vendor.name}...`);
    console.log(`   Specialty: ${vendor.specialty ? vendor.specialty.join(', ') : 'Rare Plants'}`);
    console.log(`   Booth: ${vendor.booth_number || 'N/A'}`);

    // [Deep Crawl Step]
    if (vendor.website_url && !vendor.contact_email) {
      console.log(`   🕸️ Deep Crawling website: ${vendor.website_url}`);
      try {
        const websiteText = await scrapeVendorWebsite(vendor.website_url);
        console.log(`   🤖 Flash extracting contact info from website...`);
        const extractionResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Extract the contact email, phone number, and instagram handle from this website text. Return a strict JSON object: {"email": "...", "phone": "...", "instagram": "..."}. Use null if a field is not found.\n\nText: ${websiteText.substring(0, 10000)}`,
          config: { responseMimeType: 'application/json' }
        });
        const contactInfo = JSON.parse(extractionResponse.text);
        if (contactInfo.email) vendor.contact_email = contactInfo.email;
        if (contactInfo.phone) vendor.contact_phone = contactInfo.phone;
        if (contactInfo.instagram) vendor.instagram = contactInfo.instagram;
        console.log(`   ✅ Extracted: Email (${contactInfo.email || 'N/A'}), Phone (${contactInfo.phone || 'N/A'}), IG (${contactInfo.instagram || 'N/A'})`);
      } catch (err) {
        console.log(`   ⚠️ Deep crawl skipped or failed: ${err.message}`);
      }
    }

    try {
      // Call the Flash model to bypass free-tier Pro limits
      const closerResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Draft the personalized Instagram DM and Email outreach drafts for this vendor:\n\n${JSON.stringify(vendor, null, 2)}`,
        config: {
          systemInstruction: CLOSER_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
        }
      });

      const pitchData = JSON.parse(closerResponse.text);
      
      enrichedVendors.push({
        ...vendor,
        outreach: {
          compliment: pitchData.compliment,
          instagram_dm: pitchData.instagram_dm,
          email_draft: pitchData.email_draft,
          generated_at: new Date().toISOString()
        }
      });
      console.log(`   ✅ Pitch drafted successfully!`);
    } catch (err) {
      console.error(`   ❌ Failed to draft pitch for ${vendor.name}:`, err.message);
      // Save vendor with empty outreach so the data isn't lost
      enrichedVendors.push({
        ...vendor,
        outreach: null,
        error: err.message
      });
    }
  }

  // Step 4: Save the final generated pitches to a JSON file
  const outputPath = path.join(__dirname, 'generated_pitches.json');
  try {
    await fs.writeFile(outputPath, JSON.stringify(enrichedVendors, null, 2), 'utf-8');
    console.log('\n==================================================');
    console.log('🔥 WORKFLOW COMPLETED SUCCESSFULLY 🔥');
    console.log(`Generated pitches saved to: ${outputPath}`);
    console.log(`Total leads generated: ${enrichedVendors.length}`);
    console.log('Please open the file and review the pitches before sending!');
    console.log('==================================================');
  } catch (error) {
    console.error('❌ Failed to save generated pitches output:', error);
  }
}

main().catch(console.error);
