import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Inventory Page UI", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Checking that we are in Inventory Page", async ({ page }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Products Header is Visible", async () => {
    await expect(inventoryPage.productHeader).toHaveText("Products");
    await expect(inventoryPage.productHeader).toBeVisible();
  });

  test("Inventory List is Visible", async () => {
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test("Inventory Items Have Names", async () => {
    await expect(inventoryPage.inventoryItemName).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemName.all()) {
      await expect(item).not.toHaveText("");
    }
  });

  test("Inventory Item Names are correct", async () => {
    await expect(inventoryPage.inventoryItemName).toHaveCount(6);
    await expect(inventoryPage.inventoryItemName).toHaveText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ]);
  });

  test("Inventory Items Have Descriptions", async () => {
    await expect(inventoryPage.inventoryItemDescription).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemDescription.all()) {
      await expect(item).not.toHaveText("");
    }
  });

  test("Inventory Items Have Prices", async () => {
    await expect(inventoryPage.inventoryItemPrice).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemPrice.all()) {
      await expect(item).not.toHaveText("");
    }
  });
});
