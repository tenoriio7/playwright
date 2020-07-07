const playwright = require("playwright");
const { webkit, devices } = playwright;

const iphone_11  = devices['iPhone 11 Pro']
const galaxy_S5  = devices['Galaxy S5']
const iphone_SE  = devices['iPhone SE']
const deviceList = [iphone_11,galaxy_S5,iphone_SE]
var cont = 1

const QA = require('../data/qa/environment')
var qaData = new QA()
const Uol = require('../pages/uol')

const uol = new Uol()


describe('UOL ', function () {
    it('should navigate  to login page', function () {
        (async () => {
            for (const device of  deviceList) {
                const browser = await webkit.launch(
                    {headless : true,
                    ignoreHTTPSErrors: true});
                    const context = await browser.newContext({
                      viewport: device.viewport,
                      userAgent: device.userAgent,
                      geolocation: { longitude: 12.492507, latitude: 41.889938 },
                      permissions: ['geolocation']
                    });
                    const page = await context.newPage();
                    await page.goto(qaData.uol_uri);
                    await page.screenshot({ path: `./artifacts/screenshots/mobile/device ${cont}/home_page.png` });
                    await page.click(uol.tf_email,  { waitUntil: 'load' });
                    await page.waitForSelector(uol.tf_user, { waitUntil: 'load' });
                    await page.screenshot({ path: `./artifacts/screenshots/mobile/device ${cont}/login_page.png` });
                    
                    cont++;
                    await browser.close();
            }
        })();
    });
});