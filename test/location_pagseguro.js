const playwright = require('playwright');
const Maps = require('../pages/google_maps')
const QA = require('../data/qa/environment')
var mapsObject = new Maps()
var qaData = new QA()
describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
        (async () => {
            for (const browserType of ['chromium'
                //  'firefox', 'webkit'  Error: Geolocation emulation is not supported in Firefox
            ]) {
                const browser = await playwright[browserType].launch({
                    headless: false,
                    args: [
                        '--start-maximized' // you can also use '--start-fullscreen'
                    ]
                });
                const context = await browser.newContext({
                    // viewport: { width: 1280, height: 721 },
                    ignoreHTTPSErrors: true
                });

                const page = await context.newPage();
                await page.goto(qaData.maps_uri);
                const dimensions = await page.evaluate(() => {
                    return {
                        width: document.getElementById.innerHTML = screen.width,
                        height: document.getElementById.innerHTML = screen.height,
                        deviceScaleFactor: window.devicePixelRatio
                    }
                });
                page.setViewport({width:  dimensions.width, height: dimensions.height});

                await page.waitForSelector(mapsObject.tf_search_box, { waitUntil: 'load' });
                await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/location_tests/${browserType}/home_maps-${browserType}.png` });
                await page.click(mapsObject.tf_search_box, { waitUntil: 'load' });
                await page.keyboard.type('PagSeguro UOL - Avenida Brigadeiro Faria Lima - Jardim Paulistano, São Paulo - SP');
                await page.waitForSelector(mapsObject.bt_search_box_search);
                await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/location_tests/${browserType}/search_pagseguro-${browserType}.png` });
                await page.click(mapsObject.bt_search_box_search, { waitUntil: 'load' });
                await page.waitForSelector(mapsObject.tf_routes, { waitUntil: 'load' });
                await page.click(mapsObject.tf_routes, { waitUntil: 'load' });
                await page.screenshot({ path: `${process.env['HOME']}/workspace/playwright/screenshots/location_tests/${browserType}/pagseguro_result-${browserType}.png` });
                await browser.close();
            }
        })();
    });
});


