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

  // clicking a button
  await page.click("#clickme");
  const clickedData = await page.$eval("#data", (el) => el.textContent);
  console.log("clickedData: ", clickedData);

  // save photos to folder
  const photos = await page.$$eval("img", (imgs) => {
    return imgs.map((img) => img.src);
  });

  // submitting a form
  await page.type("#ourfield", "blue");

  await Promise.all([page.click("#ourform button"), page.waitForNavigation()]);

  const message = await page.$eval("#message", (el) => el.textContent);

  console.log("message: ", message);

  for (const photo of photos) {
    const imagePage = await page.goto(photo);

    await fs.writeFile(photo.split("/").pop(), await imagePage.buffer());
  }

  // close browser
  await browser.close();
};

start();
