const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('[type="password"]').fill('Learning@83083mK2');
  await page.locator('input[value="user"]').check();
  await page.waitForSelector('#myModal', { state: 'visible', timeout: 5000 });
  await page.locator('#okayBtn').click();
  await page.waitForSelector('#myModal', { state: 'hidden', timeout: 5000 });
  await page.locator('#terms').check();
  await page.click('#signInBtn');
  await page.waitForTimeout(3000);
  console.log('url:', page.url());
  console.log('title:', await page.title());
  const cardCount = await page.locator('.card-body a').count();
  console.log('cardCount', cardCount);
  for (let i = 0; i < cardCount; i++) {
    console.log('card', i, await page.locator('.card-body a').nth(i).textContent());
  }
  const errorText = await page.locator("[style*='block']").textContent().catch(() => null);
  console.log('error style block text:', errorText);
  const loginError = await page.locator('.alert-danger').textContent().catch(() => null);
  console.log('alert-danger:', loginError);
  await browser.close();
})();