import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getChromePath() {
  const paths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  for (const p of paths) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

export async function scrapeIAS() {
  console.log('Reading local saved IAS Expo HTML file...');
  const htmlPath = path.join(__dirname, 'International Aroid Society - Vendors & Sponsors.html');
  
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Local HTML file not found at: ${htmlPath}`);
  }
  
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  
  console.log('Launching headless browser to parse local HTML...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Setting content in page...');
  await page.setContent(htmlContent);
  
  const text = await page.evaluate(() => {
    // Append href URLs to the visible text so the LLM can extract them
    const links = Array.from(document.querySelectorAll('a'));
    links.forEach(link => {
      if (link.href && !link.href.startsWith('javascript:') && link.href !== '' && link.innerText.trim()) {
        link.innerText = `${link.innerText} (${link.href})`;
      }
    });
    return document.body.innerText;
  });
  console.log('--- HTML PARSING COMPLETED ---');

  await browser.close();
  return text;
}

export async function scrapeVendorWebsite(url) {
  const chromePath = getChromePath();
  const launchOptions = {
    headless: false,
    args: [
      '--disable-blink-features=AutomationControlled',
    ]
  };
  if (chromePath) {
    launchOptions.executablePath = chromePath;
  }
  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  
  // Hide webdriver status
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  try {
    console.log(`      Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const text = await page.evaluate(() => document.body.innerText);
    await browser.close();
    return text;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

// Self-run only if executed directly
if (process.argv[1] && (process.argv[1].endsWith('scrape_ias.mjs') || process.argv[1].endsWith('scrape_ias'))) {
  console.log('Running standalone scrape...');
  scrapeIAS().then(text => {
    console.log('Scraped text sample (first 1000 chars):');
    console.log(text.substring(0, 1000));
  }).catch(console.error);
}

