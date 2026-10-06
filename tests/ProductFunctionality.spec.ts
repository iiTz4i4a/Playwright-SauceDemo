import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Product Functionality", () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("should add one inventory item to the cart", async () => {
    await inventoryPage.inventoryItemCartButton.first().click();
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
    await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
  });

  test("should add all inventory items to the cart", async () => {
    let count = 1
    for (const item of await inventoryPage.inventoryItem.all()) {
      // await expect(item.getByRole("button",{name:"Add to cart"})).toBeVisible()
      await item.getByRole("button", { name: "Add to cart" }).click();
      await expect(inventoryPage.shoppingCartBadge).toHaveText(String(count));
      count++
    }
    await expect(inventoryPage.shoppingCartBadge).toHaveText("6");
  });

  test("should change Add to Cart button to Remove after adding an item", async () => {
    const firstItem = inventoryPage.inventoryItem.first();
    await firstItem.getByRole("button",{name: "Add to cart"}).click()
    await expect(firstItem.getByRole("button",{name:"Remove"})).toBeVisible()
  });




});
