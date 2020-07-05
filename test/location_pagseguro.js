const playwright = require('playwright');
const Maps = require('../pages/google_maps')
const QA = require('../data/qa/environment')
const Helper = require('../helper/view_helper')
var mapsObject = new Maps()
var qaData = new QA()


describe('Location Test', function () {
    it('should search PagSeguro in Google', function () {
        (async () => {
            for (const browserType of ['chromium', 'firefox']) {
                const browser = await playwright[browserType].launch({
                    headless: false, ignoreHTTPSErrors: true, args: [
                        '--start-maximized' // you can also use '--start-fullscreen'
                    ]
                });
                const context = await browser.newContext();
                const page = await context.newPage();
                dimensions = await Helper.load_dimensions(page)
                await page.setViewportSize({
                    width: dimensions.width,
                    height: dimensions.height,
                  });
                await page.goto(qaData.maps_uri, { waitUntil: 'load' });
                await page.waitForSelector(mapsObject.tf_search_box);
                await page.screenshot({ path: `./screenshots/location_tests/${browserType}/home_maps-${browserType}.png` }, { waitUntil: 'load' });
                await page.click(mapsObject.tf_search_box, { waitUntil: 'load' });
                await page.keyboard.type('PagSeguro UOL - Avenida Brigadeiro Faria Lima - Jardim Paulistano, São Paulo - SP');
                await page.waitForSelector(mapsObject.bt_search_box_search);
                await page.screenshot({ path: `./screenshots/location_tests/${browserType}/search_pagseguro-${browserType}.png` });
                await page.click(mapsObject.bt_search_box_search, { waitUntil: 'load' });
                await page.waitForSelector(mapsObject.tf_routes, { waitUntil: 'load' });
                await page.click(mapsObject.tf_routes, { waitUntil: 'load' });
                await page.screenshot({ path: `./screenshots/location_tests/${browserType}/pagseguro_result-${browserType}.png` });
                await browser.close();
            }
        })();
    });
});