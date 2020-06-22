const playwright = require('playwright');
const Login = require('../models/pagseguro')
var login_object = new Login()
describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
        (async () => {
            for (const browserType of ['chromium', 'firefox', 'webkit']) {
                const browser = await playwright[browserType].launch({headless : false, ignoreHTTPSErrors: true});
                const context = await browser.newContext({viewport:{width: 1280, height: 721}});
                const page = await context.newPage();
                await page.goto('https://pagseguro.uol.com.br/',{waitUntil: 'load'});
                await page.click(login_object.bt_login);
                await page.click(login.bt_login_access);
                page.once('load', () => console.log('Page loaded!'));
                // await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/login_tests/${browserType}/first_step-${browserType}.png` });
                await page.waitForSelector(login_object.tf_login);
                await page.click(login.tf_login, {waitUntil: 'load'});
                // await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/second_tests/${browserType}/first_step-${browserType}.png` });
                await page.keyboard.type('cabify_mobile@mock.com');
                await page.waitForSelector(login.tf_password);
                await page.click(login.tf_password, {waitUntil: 'load'});
                await page.keyboard.type('ps654321');
                await page.click(login.bt_submit, {waitUntil: 'load'});
                // await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/login_tests/${browserType}/finished_login${browserType}.png` });
                await browser.close();
            }
        })();
    });
});
