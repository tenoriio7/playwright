const playwright = require('playwright');
const Maps = require('../pages/google_maps')
const QA = require('../data/qa/environment')
const Helper = require('../helper/view_helper')

var mapsObject = new Maps()
var qaData = new QA()
var page;
var browser;

describe('#indexOf()', function () {

    before(async function () {
        return_configs = await Helper.load_config(browser, page, qaData.maps_uri)
        page = return_configs[0]
        browser = return_configs[1]
    });

    before(async function () {
        return_configs = await Helper.load_config(browser, page, qaData.maps_uri)
        page = return_configs[0]
        browser = return_configs[1]
    });

    it('should login in Ibanking PagSeguro', function () {
        (async () => {
            // try {
                for (const browserType of ['chromium', 'firefox', 'webkit']) {
                    await page.waitForSelector(mapsObject.tf_search_box);
                    await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/location_tests/${browserType}/home_maps-${browserType}.png` }, { waitUntil: 'load' });
                    await page.click(mapsObject.tf_search_box, { waitUntil: 'load' });
                    await page.keyboard.type('PagSeguro UOL - Avenida Brigadeiro Faria Lima - Jardim Paulistano, São Paulo - SP');
                    await page.waitForSelector(mapsObject.bt_search_box_search);
                    await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/location_tests/${browserType}/search_pagseguro-${browserType}.png` });
                    await page.click(mapsObject.bt_search_box_search, { waitUntil: 'load' });
                    await page.waitForSelector(mapsObject.tf_routes, { waitUntil: 'load' });
                    await page.click(mapsObject.tf_routes, { waitUntil: 'load' });
                    await page.screenshot({ path: `${process.env['HOME']}/development/playwright/screenshots/location_tests/${browserType}/pagseguro_result-${browserType}.png` });
                    return await browser.close();
                }
            // } catch (e) {
            //     console.log(e);   // caught
            // }
        })
            ();
    }
    );
});


