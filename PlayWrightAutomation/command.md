# Run Playwright Scripts

If you are in the outer workspace root folder (`C:\Users\celva\Downloads\PlayWrightAutomation`), use the root forwarding scripts:

```powershell
npm run test
npm run regression
npm run webTests
npm run APITests
npm run install-playwright
npm run safari
```

If you prefer to work directly in the nested project folder, change into the project folder and install dependencies there:

```powershell
cd C:\Users\celva\Downloads\PlayWrightAutomation\PlayWrightAutomation
npm install
```

Run the default test suite:

```powershell
npm test
```

Run the full Playwright regression suite:

```powershell
npm run regression
```

Run only web tests tagged with `@Web`:

```powershell
npm run webTests
```

Run only API tests tagged with `@API`:

```powershell
npm run APITests
```

Install Playwright browsers:

```powershell
npm run install-playwright
```

Run Safari project tests (if configured):

```powershell
npm run safari
```

Run a single test file directly:

```powershell
npx playwright test tests/UIBasicstest.spec.js --reporter=line
```
