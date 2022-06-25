const puppeteer = require("puppeteer");

const start = async () => {
  // Create a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the page
  await page.goto("https://learnwebcode.github.io/practice-requests/");

  // test png screenshot
  await page.screenshot({ path: "example.png", fullPage: true });

  // close browser
  await browser.close();
};

start();
