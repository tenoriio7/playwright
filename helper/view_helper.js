const playwright = require('playwright');
exports.load_config = async function (browser, page, uri) {
    for (const browserType of ['chromium', 'firefox', 'webkit'])
        browser = await playwright[browserType].launch({
            ignoreHTTPSErrors: true,
            headless: false,
            args: [
                '--start-maximized' // you can also use '--start-fullscreen'
            ]
        });
    const context = await browser.newContext({
        // viewport: { width: 1280, height: 721 },
        ignoreHTTPSErrors: true
    });

    page = await context.newPage();
    await page.goto(uri, { waitUntil: 'load' });
    const dimensions = await page.evaluate(() => {
        return {
            width: document.getElementById.innerHTML = screen.width,
            height: document.getElementById.innerHTML = screen.height,
            deviceScaleFactor: window.devicePixelRatio
        }
    });
    page.setViewport({ width: dimensions.width, height: dimensions.height });
    return [page, browser];

}





