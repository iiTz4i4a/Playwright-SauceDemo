import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { ProductPage } from "../pages/ProductPage";

test.describe("Navigation testing", () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;
	let cartPage: CartPage;
	let productPage: ProductPage

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);
		productPage = new ProductPage(page)

		await loginPage.goTo();
		await loginPage.login("standard_user", "secret_sauce");
	});
	// TODO: Create tests
	test("Open product details page", async () => {
		await inventoryPage.inventoryItemName.getByText("Sauce Labs Backpack").click()
		await expect(productPage.expectProductPage(4))
	});
	// test("Open cart page", async () => {});
	// test("Open sidebar", async () => {});
	// test("Logout", async () => {});
	// test("Reset App State resets cart", async () => {});
});
