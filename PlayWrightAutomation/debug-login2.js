const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill("[type='password']", 'Learning@83083mK2');
  await page.check('#terms');
  await page.click('#signInBtn');
  await page.waitForTimeout(5000);
  console.log('current URL:', page.url());
  console.log('terms checked:', await page.isChecked('#terms'));
  console.log('role selected:', await page.locator('input[type=radio]:checked').evaluate(el => el.value));
  console.log('body contains error?', await page.locator('[style*="block"]').textContent());
  console.log('card count', await page.locator('.card-body a').count());
  console.log('page html snippet:', await page.content().then(html => html.slice(0, 2000)));
  await browser.close();
})();