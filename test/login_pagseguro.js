const playwright = require('playwright');
const Login = require('../pages/pagseguro')
const QA = require('../data/qa/environment')
const Data = require('../data/qa/data')
var login = new Login()
var qaData = new QA()
var user  = new Data
const Helper = require('../helper/view_helper')

describe('#indexOf()', function () {
    it('should login in Ibanking PagSeguro', function () {
        (async () => {
            for (const browserType of ['chromium']) {
                const browser = await playwright[browserType].launch({headless : false, ignoreHTTPSErrors: true, args:[
                    '--start-maximized' // you can also use '--start-fullscreen'
                 ]});
                 const context = await browser.newContext();
                 const page = await context.newPage();
                 dimensions = await Helper.load_dimensions(page)
                 await page.setViewportSize({
                     width: dimensions.width,
                     height: dimensions.height,
                   });
                   
                await page.goto("https://www.uol.com.br/",{waitUntil: 'load'});
                await page.screenshot({ path: `./screenshots/login_tests/${browserType}/first_step-${browserType}.png` });
                await page.click('.HU_blackBar_listServices__service__email', {waitUntil: 'load'});
                await page.screenshot({ path: `./screenshots/login_tests/${browserType}/start-login${browserType}.png` });
                await page.click('[type="email"]', {waitUntil: 'load'});
                await page.keyboard.type('[type="email"]',user.login);
                await page.press('[type="email"]', "Enter");
                await page.click('#pass', {waitUntil: 'load'});
                await page.keyboard.type(user.password);
                await page.click('[type="button"]', {waitUntil: 'load'});
                await page.screenshot({ path: `./screenshots/login_tests/login_tests/${browserType}/finished_login${browserType}.png` });
                await browser.close();
            }
        })();
    });
});