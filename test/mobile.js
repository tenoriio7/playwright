const playwright = require("playwright");
const { webkit, devices } = playwright;

const iphone_11  = devices['iPhone 11 Pro']
const galaxy_S5  = devices['Galaxy S5']
const iphone_SE  = devices['iPhone SE']
const deviceList = [iphone_11,galaxy_S5,iphone_SE]
// var cont = smartphonesNames.length; 
var cont = 1

describe('UOL ', function () {
    it('should navigate to Login Page', function () {
        (async () => {
            for (const device of  deviceList) {
                const browser = await webkit.launch(
                    {headless : false,
                    ignoreHTTPSErrors: true});
                    const context = await browser.newContext({
                      viewport: device.viewport,
                      userAgent: device.userAgent,
                      geolocation: { longitude: 12.492507, latitude: 41.889938 },
                      permissions: ['geolocation']
                    });
                    const page = await context.newPage();
                    await page.goto('https://www.uol.com.br/');
                    await page.screenshot({ path: `./screenshots/mobile/device ${cont}/home_page.png` });
                    await page.click(".email_form_send",  { waitUntil: 'load' });
                    await page.waitForSelector("#user", { waitUntil: 'load' });
                    await page.screenshot({ path: `./screenshots/mobile/device ${cont}/login_page.png` });
                    
                    cont++;
                    await browser.close();
            }
        })();
    });
});