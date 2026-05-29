import puppeteer from 'puppeteer';

export async function scrapeIAS() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log('Navigating to IAS Expo vendors page...');
  await page.goto('https://www.aroid.org/annual-expo/vendors-sponsors.php', { waitUntil: 'networkidle2' });

  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- SCRAPING COMPLETED ---');

  await browser.close();
  return text;
}

// Self-run only if executed directly
if (process.argv[1] && (process.argv[1].endsWith('scrape_ias.mjs') || process.argv[1].endsWith('scrape_ias'))) {
  console.log('Running standalone scrape...');
  scrapeIAS().then(text => {
    console.log('Scraped text sample (first 1000 chars):');
    console.log(text.substring(0, 1000));
  }).catch(console.error);
}

