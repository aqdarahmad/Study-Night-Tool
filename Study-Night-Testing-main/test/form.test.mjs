import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

const options = new chrome.Options();

(async function cardSetTest() {
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get("http://localhost:1234");

    // 2. Go to cardSet page
    await driver.findElement(By.id("cardSetPage")).click();
    const cardPage = await driver.wait(
      until.elementLocated(By.className("cardPageContainer")),
      5000
    );
    console.log("✅ Card Page Loaded:", await cardPage.isDisplayed());

    // 3.get initial number of card sets
    const initialItems = await driver.findElements(
      By.css(".setContainer .cardSets")
    );
    const initialLength = initialItems.length;

    // 4. Press the "Add New Set" button
    const toggleFormBtn = await driver.findElement(
      By.css('[data-cy="toggle_form"]')
    );
    await driver.wait(until.elementIsVisible(toggleFormBtn), 3000);
    await toggleFormBtn.click();

    // 5. Enter a title for the new set
    const titleInput = await driver.findElement(By.id("titleInput"));
    await driver.wait(until.elementIsVisible(titleInput), 3000);
    await titleInput.clear();
    await titleInput.sendKeys("My Set");

    // 6. Press the Submit button
    const submitBtn = await driver.findElement(By.css('[type="submit"]'));
    await submitBtn.click();

    // 7. Check if the new set is added
    await driver.wait(async () => {
      const updatedItems = await driver.findElements(
        By.css(".setContainer .cardSets")
      );
      return updatedItems.length === initialLength + 1;
    }, 5000);
    console.log("✅ New Set Added");

    const currentSize = initialLength + 1;

    // 8. Press on the newly added card
    const newCardSet = await driver.findElement(
      By.css(`[data-cy="${currentSize}"]`)
    );
    await driver.wait(until.elementIsVisible(newCardSet), 3000);
    await newCardSet.click();

    // 9. Press the "Add New Card" button
    const addCardBtn = await driver.findElement(
      By.css('[data-cy="toggle_form"]')
    );
    await driver.wait(until.elementIsVisible(addCardBtn), 3000);
    await addCardBtn.click();

    // 10.Fill in the term field
    const termInput = await driver.findElement(By.id("termInput"));
    await driver.wait(until.elementIsVisible(termInput), 3000);
    await termInput.sendKeys("My term");

    // 11. Fill in the description field
    const descInput = await driver.findElement(By.id("descriptionInput"));
    await descInput.sendKeys("My Description");

    // 12. Press the Submit button to add the card
    const submitCardBtn = await driver.findElement(By.css('[type="submit"]'));
    await submitCardBtn.click();

    console.log("✅ Card Added Successfully");
  } catch (err) {
    console.error("❌ Test failed:", err.message);
  } finally {
    await driver.quit();
  }
})();
