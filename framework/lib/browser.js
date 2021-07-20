import playwright from 'playwright';

let browser;
let context;
let page;

async function goto(url){
    await page.goto(url);
    return page;
};
async function runWithAuth(){
    browser = await playwright.chromium.launch({
        headless: false,
        slowMo: 1000,
    });
    const options = {
        storageState: 'auth.json',
    };
    context = await browser.newContext(options);
    page = await context.newPage();
    return page;
};
async function run(){
    browser = await playwright.chromium.launch({
        headless: false,
        slowMo: 1000,
    });
    context = await browser.newContext();
    page = await context.newPage();
    return page;
};

async function stop(){
    await page.screenshot('demo.jpg');
    await page.close();
    await browser.close();
};

export { goto, run, runWithAuth, stop }