
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('input[value="user"]').check();
  await page.waitForSelector('#myModal', { state: 'visible', timeout: 5000 });
  console.log('modal visible after wait', await page.isVisible('#myModal'));
  console.log('okay visible after wait', await page.isVisible('#okayBtn'));
  console.log('okay count', await page.locator('#okayBtn').count());
  const modalClass = await page.locator('#myModal').getAttribute('class');
  console.log('modal class', modalClass);
  try {
    await page.locator('#okayBtn').click({ timeout: 5000 });
    console.log('clicked okay');
  } catch (e) {
    console.log('okay click error', e.message);
  }
  await page.waitForTimeout(1000);
  console.log('modal class after click', await page.locator('#myModal').getAttribute('class'));
  console.log('modal visible after click', await page.isVisible('#myModal'));
  await browser.close();
})();
