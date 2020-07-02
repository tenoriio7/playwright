const playwright = require('playwright');
const Login = require('../pages/pagseguro')
const QA = require('../data/qa/environment')
const Data = require('../data/qa/data')
var login = new Login()
var qaData = new QA()
var user  = new Data

describe('#indexOf()', function () {
    it('should login in Ibanking PagSeguro', function () {
        (async () => {
            for (const browserType of ['chromium', 'firefox', 'webkit'
            ]) {
                const browser = await playwright[browserType].launch({headless : false, ignoreHTTPSErrors: true, args:[
                    '--start-maximized' // you can also use '--start-fullscreen'
                 ]});
                const context = await browser.newContext({viewport:{width: 1920, height: 1080}});
                const page = await context.newPage();
                await page.goto(qaData.pagseguro_uri,{waitUntil: 'load'});
                await page.click(login.bt_login);
                await page.click(login.bt_login_access);
                page.once('load', () => console.log('Page loaded!'));
                await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/login_tests/${browserType}/first_step-${browserType}.png` });
                await page.waitForSelector(login.tf_login);
                await page.click(login.tf_login, {waitUntil: 'load'});
                await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/login_tests/${browserType}/start-login${browserType}.png` });
                await page.keyboard.type(user.login);
                await page.waitForSelector(login.tf_password);
                await page.click(login.tf_password, {waitUntil: 'load'});
                await page.keyboard.type(user.password);
                await page.click(login.bt_submit, {waitUntil: 'load'});
                await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/login_tests/${browserType}/finished_login${browserType}.png` });
                await browser.close();
            }
        })();
    });
});
