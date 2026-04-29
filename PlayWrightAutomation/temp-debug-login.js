const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log('has modal after load', await page.$('#myModal') ? 'yes' : 'no');
  console.log('modal visible after load', await page.isVisible('#myModal'));
  await page.locator('input[value="user"]').check();
  console.log('checked user', await page.locator('input[value="user"]').isChecked());
  console.log('has modal after radio', await page.$('#myModal') ? 'yes' : 'no');
  console.log('modal visible after radio', await page.isVisible('#myModal'));
  console.log('terms disabled?', await page.$eval('#terms', el=>el.disabled ? 'disabled' : 'enabled'));
  await browser.close();
})();
