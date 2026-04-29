const { chromium } = require('playwright');
(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log('loaded url', page.url());
    console.log('radio count', await page.locator('input[type=radio]').count());
    console.log('selected radio values', await page.locator('input[type=radio]').evaluateAll(nodes => nodes.map(n => ({value: n.value, checked: n.checked}))));
    await page.fill('#username', 'rahulshettyacademy');
    await page.fill("[type='password']", 'Learning@83083mK2');
    await page.check('#terms');
    await page.click('#signInBtn');
    await page.waitForTimeout(6000);
    console.log('after click url', page.url());
    const error = await page.locator('[style*="block"]').textContent().catch(() => null);
    console.log('error text', error);
    console.log('terms checked after click', await page.isChecked('#terms'));
    console.log('role checked after click', await page.locator('input[type=radio]:checked').evaluate(el => el ? el.value : 'none').catch(() => 'none'));
    console.log('card count', await page.locator('.card-body a').count());
    console.log('body snippet', (await page.content()).slice(0,1200));
  } catch (e) {
    console.error('error', e);
  } finally {
    if (browser) await browser.close();
  }
})();