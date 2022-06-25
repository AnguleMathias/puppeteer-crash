const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const start = async () => {
  // Create a new browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Navigate to the page
  await page.goto("https://learnwebcode.github.io/practice-requests/");

  // // test png screenshot
  // await page.screenshot({ path: "example.png", fullPage: true });

  // save cat names to txt file
  const catNames = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".info strong")).map(
      (item) => item.textContent
    );
  });

  await fs.writeFile("cat-names.txt", catNames.join("\r\n"));

  // close browser
  await browser.close();
};

start();
