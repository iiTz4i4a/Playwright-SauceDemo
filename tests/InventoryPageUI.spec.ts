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

  test("Inventory Shopping Cart icon is visible", async () => {
    await expect(inventoryPage.shoppingCartIcon).toBeVisible();
  });

  test("Inventory Hamburger Menu is visible", async () => {
    await expect(inventoryPage.hamburgerMenu).toBeVisible();
  });

  // TODO: Create a test-case for Opening navigation Bar && Closing it && Checking The available links

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

  test("Inventory Items Have Correct Prices", async () => {
    await expect(inventoryPage.inventoryItemPrice).toHaveCount(6);
    await expect(inventoryPage.inventoryItemPrice).toHaveText([
      "$29.99",
      "$9.99",
      "$15.99",
      "$49.99",
      "$7.99",
      "$15.99",
    ]);
  });

  test("Inventory Items Have Image", async () => {
    await expect(inventoryPage.inventoryItemImages).toHaveCount(6);
  });

  test("Inventory Items Have Corrct Images", async () => {
    const expectedImageAlt = [
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Fleece Jacket",
      "Sauce Labs Onesie",
      "Test.allTheThings() T-Shirt (Red)",
    ];
    const expectedImageSrc = [
      "/assets/sauce-backpack-1200x1500-CjRW-Djj.jpg",
      "/assets/bike-light-1200x1500-DxcZRFOA.jpg",
      "/assets/bolt-shirt-1200x1500-mR0ldpVS.jpg",
      "/assets/sauce-pullover-1200x1500-BfbI-PSd.jpg",
      "/assets/red-onesie-1200x1500-BrSuq0ic.jpg",
      "/assets/red-tatt-1200x1500-E-qp6aYf.jpg",
    ];

    for (let i = 0; i < expectedImageAlt.length; i++) {
      const image = inventoryPage.inventoryItemImages.nth(i);
      await expect(image).toHaveAttribute("alt", expectedImageAlt[i]);
      await expect(image).toHaveAttribute("src", expectedImageSrc[i]);
      await expect(image).toBeVisible();
    }
  });

  test("Inventory Items Have Add To Cart Button", async () => {
    await expect(inventoryPage.inventoryItemCartButton).toHaveCount(6);
  });
});
