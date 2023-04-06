const { chromium } = require('playwright');

async function openBrowser() {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    return { browser, context };
}

async function closeBrowser(browser) {
    await browser.close();
}



module.exports = { openBrowser, closeBrowser };