
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('input[value="user"]').check();
  console.log('modal visible after radio', await page.isVisible('#myModal'));
  await page.locator('#okayBtn').click();
  console.log('modal visible after okay', await page.isVisible('#myModal'));
  console.log('terms visible after okay', await page.isVisible('#terms'));
  await browser.close();
})();
