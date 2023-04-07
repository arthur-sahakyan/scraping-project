const {closeBrowser, openBrowser} = require('./browser/index');

async function startScraping() {
    const {browser, context} = (await openBrowser());
    const page = await context.newPage();

    //go to the page
    await page.goto('https://www.esterox.com/');

    // checking if there are button for accept cookies click on it
    const acceptButton = await page.$$("button:text('Accept')");
    if (acceptButton.length) {
        await acceptButton[0].click();
    }

    // click on blogs button in navbar
    await page.click("a:text('Blog')");


    await page.waitForTimeout(6000);
    const result = await page.evaluate(() => {
        const blogs = document.querySelectorAll('.blog-block');
        const results = [];
        for (let i = 0; i < blogs.length; i++) {
            const result = {};
            const image = blogs[i].querySelector(".blog-block__image").getAttribute("src");
            const name = blogs[i].querySelector(".blog-block__name").innerText;
            const createdAt = blogs[i].querySelector(".blog-block__date").innerText;
            const url = `https://esterox.com${blogs[i].querySelector(".blog-block__link").getAttribute("href")}`;
            result['img'] = image;
            result['name'] = name;
            result['createdAt'] = createdAt;
            result['url'] = url;
            results.push(result);
        }
        return results;
    });
    console.log(result)

    await closeBrowser(browser);
}


(async () => {
    try {
        await startScraping();
    } catch (e) {
        console.log('error ------>', e)
    }
})();

