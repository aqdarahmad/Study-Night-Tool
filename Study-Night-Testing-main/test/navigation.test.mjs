import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const options = new chrome.Options();

(async function navigationTests() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("http://localhost:1234");

    await driver.findElement(By.id("aboutPage")).click();
    const about = await driver.wait(
      until.elementLocated(By.className("aboutContainer")),
      5000
    );
    console.log("About page visible:", await about.isDisplayed());

    await driver.findElement(By.id("homePage")).click();
    const home = await driver.wait(
      until.elementLocated(By.className("homeContainer")),
      5000
    );
    console.log("Home page visible:", await home.isDisplayed());

    await driver.findElement(By.id("cardSetPage")).click();
    const cardSet = await driver.wait(
      until.elementLocated(By.className("cardPageContainer")),
      5000
    );
    console.log("Card Set page visible:", await cardSet.isDisplayed());
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await driver.quit();
  }
})();
