const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('title', await page.title());
  await page.fill('#username', 'rahulshetty');
  await page.fill("[type='password']", 'learning');
  await page.click('#signInBtn');
  await page.waitForTimeout(2000);
  console.log('after bad login url', page.url());
  console.log('error text', await page.locator("[style*='block']").textContent());
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill("[type='password']", 'Learning@83083mK2');
  await page.check('#terms');
  await page.click('#signInBtn');
  await page.waitForTimeout(5000);
  console.log('after good login url', page.url());
  const bodyText = await page.locator('body').textContent();
  console.log('body snippet', bodyText ? bodyText.slice(0,500) : 'no body text');
  const count = await page.locator('.card-body a').count();
  console.log('card count', count);
  for (let i = 0; i < count; i++) {
    const loc = page.locator('.card-body a').nth(i);
    console.log(i, await loc.isVisible(), await loc.textContent());
  }
  await browser.close();
})();
