const playwright = require('playwright');

describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
        (async () => {
            for (const browserType of ['chromium', 'firefox', 'webkit']) {
                const browser = await playwright[browserType].launch({headless : false});
                const context = await browser.newContext({viewport:{width: 1280, height: 721}});
                const page = await context.newPage();
                await page.goto('https://pagseguro.uol.com.br/',{waitUntil: 'load'});
                await page.click('[class="button button--light-sea-green"]');
                await page.click('#entrar');
                page.once('load', () => console.log('Page loaded!'));
                await page.waitForSelector('#user');
                await page.click('#user', {waitUntil: 'load'});
                await page.keyboard.type('cabify_mobile@mock.com');
                await page.waitForSelector('#password');
                await page.click('#password', {waitUntil: 'load'});
                await page.keyboard.type('ps654321');
                await page.click('[type="submit"]', {waitUntil: 'load'});
                await page.screenshot({ path: '/Users/tenorio/projects/comunidade/screenshots/'+`${browserType}`+`/example-${browserType}.png` });
                sleep(100000);
                await browser.close();
            }
        })();
    });
});
