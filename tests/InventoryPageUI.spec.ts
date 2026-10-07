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

  test("should navigate to the Inventory page after login", async ({ page }) => {
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("should display the shopping cart icon", async () => {
    await expect(inventoryPage.shoppingCartIcon).toBeVisible();
  });

  test("should display the hamburger menu", async () => {
    await expect(inventoryPage.hamburgerMenu).toBeVisible();
  });

  test("should open the navigation menu", async () => {
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
  });

  test("should close the navigation menu", async()=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await inventoryPage.navigationMenuClose.click()
    await expect(inventoryPage.navigationMenu).not.toBeVisible()

  })

  test("should display all navigation menu links", async()=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await expect(inventoryPage.navigationMenuLinks).toHaveCount(5)
    await expect(inventoryPage.navigationMenuLinks).toHaveText([
      "All Items",
      "Dynamic Catalog",
      "About",
      "Logout",
      "Reset App State",
    ])

  })

  test("should display the Dynamic Catalog submenu", async()=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await inventoryPage.navigationMenuLinks.getByText(      "Dynamic Catalog").click()
    await expect(inventoryPage.navigationSubMenu).toBeVisible()
    await expect(inventoryPage.navigationSubLinks).toHaveCount(3)
    await expect(inventoryPage.navigationSubLinks).toHaveText([
      "Lazy Load",
      "Spinner",
      "Slider",
    ])
  })


  test("should navigate to the Inventory page when clicking All Items", async({page})=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await inventoryPage.navigationMenuLinks.getByText(      "All Items").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
  })

  test("should navigate to the Sauce Labs website when clicking About", async({page})=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await inventoryPage.navigationMenuLinks.getByText(      "About").click()
    await expect(page).toHaveURL("https://saucelabs.com/")
  })

test("should log out the user from the navigation menu", async({page})=>{
    await inventoryPage.hamburgerMenu.click()
    await expect(inventoryPage.navigationMenu).toBeVisible()
    await inventoryPage.navigationMenuLinks.getByText(      "Logout").click()
    await expect(page).toHaveURL("https://www.saucedemo.com/")
  })

  test("should display the Products header", async () => {
    await expect(inventoryPage.productHeader).toBeVisible();
    await expect(inventoryPage.productHeader).toHaveText("Products");
  });

  test("should display the inventory list", async () => {
    await expect(inventoryPage.inventoryList).toBeVisible();
  });

  test("should display all inventory item names", async () => {
    await expect(inventoryPage.inventoryItemName).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemName.all()) {
      await expect(item).not.toHaveText("");
    }
  });

  test("should display correct inventory item names", async () => {
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

  test("should display descriptions for all inventory items", async () => {
    await expect(inventoryPage.inventoryItemDescription).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemDescription.all()) {
      await expect(item).not.toHaveText("");
    }
  });

  test("should display prices for all inventory items", async () => {
    await expect(inventoryPage.inventoryItemPrice).toHaveCount(6);

    for (const item of await inventoryPage.inventoryItemPrice.all()) {
      await expect(item).not.toHaveText("");
    }
  });

  test("should display correct prices for all inventory items", async () => {
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

  test("should display images for all inventory items", async () => {
    await expect(inventoryPage.inventoryItemImages).toHaveCount(6);
  });

  test("should display correct images for all inventory items", async () => {
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

  test("should display an Add to Cart button for each inventory item", async () => {
    await expect(inventoryPage.inventoryItemCartButton).toHaveCount(6);
  });
});
