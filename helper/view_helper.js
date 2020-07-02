exports.load_dimensions = async function (page) {
    const dimensions = await page.evaluate(() => {
        return {
            width: document.getElementById.innerHTML = screen.width,
            height: document.getElementById.innerHTML = screen.height,
            deviceScaleFactor: window.devicePixelRatio
        }
    });
    return {width: dimensions.width, height: dimensions.height};

}





