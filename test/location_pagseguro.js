const playwright = require('playwright');

describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
        (async () => {
            for (const browserType of ['chromium',
            //  'firefox',   Error: Geolocation emulation is not supported in Firefox
              'webkit']) {
                const browser = await playwright[browserType].launch({ headless: false });
                const context = await browser.newContext({
                    viewport: { width: 1280, height: 721 },
                    geolocation: { longitude: 12.492507, latitude: 41.889938 },
                    permissions: { 'https://www.google.com': ['geolocation'] }
                });
                const page = await context.newPage();
                await page.goto('https://maps.google.com');
                await page.click('#searchboxinput', { waitUntil: 'load' });
                await page.keyboard.type('PagSeguro UOL - Avenida Brigadeiro Faria Lima - Jardim Paulistano, São Paulo - SP');
                await page.waitForSelector('#searchbox-searchbutton');
                await page.click('#searchbox-searchbutton', { waitUntil: 'load' });
                await page.waitForSelector('[aria-label="Rotas"]', { waitUntil: 'load' });
                await page.click('[data-value="Rotas"]', { waitUntil: 'load' });
                await page.screenshot({ path: '/Users/tenorio/projects/comunidade/screenshots/location_tests/'+`${browserType}`+`/example-${browserType}.png` });
                await browser.close();
            }
        })();
    });
});
