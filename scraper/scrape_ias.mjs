import puppeteer from 'puppeteer';

async function debugIAS() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log('Navigating...');
  await page.goto('https://www.aroid.org/annual-expo/vendors-sponsors.php', { waitUntil: 'networkidle2' });

  const text = await page.evaluate(() => document.body.innerText);
  console.log('--- PAGE TEXT START ---');
  console.log(text.substring(0, 2000));
  console.log('--- PAGE TEXT END ---');

  await browser.close();
}

debugIAS().catch(console.error);
