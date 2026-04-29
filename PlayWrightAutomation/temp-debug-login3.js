
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('input[value="user"]').check();
  const modal = await page.locator('#myModal').first();
  console.log('modal count', await page.locator('#myModal').count());
  console.log('modal html', await modal.evaluate(el => el.outerHTML));
  console.log('okay visible', await page.isVisible('#okayBtn'));
  console.log('okay html', await page.locator('#okayBtn').first().evaluate(el => el.outerHTML));
  await browser.close();
})();
