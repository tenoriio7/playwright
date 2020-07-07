const { chromium } = require("playwright");
const { saveVideo } = require("playwright-video");
const QA = require('../data/qa/environment')
var qaData = new QA()
const GitHub = require('../pages/github')
var github = new GitHub()


describe('Record Video Test', function () {
    it('Record video Test', function () {
      (async () => {
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
        const capture = await saveVideo(page, "./artifacts/videos/video.mp4");
      
        await page.goto(qaData.github_uri);
        await page.type(github.tf_search_box, "Playwright");
        await page.press(github.tf_search_box, "Enter");
        await page.click(github.search_list);
        await capture.stop();
        await browser.close();
        }catch(err){
            console.log(err)
            process.exit(1);
        }

      })();
      
    });
});

