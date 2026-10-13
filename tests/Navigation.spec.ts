import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { ProductPage } from "../pages/ProductPage";

test.describe("Navigation testing", () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;
	let cartPage: CartPage;
	let productPage: ProductPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);
		productPage = new ProductPage(page);

		await loginPage.goTo();
		await loginPage.login("standard_user", "secret_sauce");
	});

	test("Open product details page", async () => {
		await inventoryPage.inventoryItemName
			.getByText("Sauce Labs Backpack")
			.click();
		await expect(productPage.expectProductPage(4));
	});

	test("Open cart page", async () => {
		await inventoryPage.shoppingCartIcon.click();
		await expect(cartPage.expectCartPage());
	});

	test("should open the navigation menu", async () => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
	});

	test("should close the navigation menu", async () => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await inventoryPage.navigationMenuClose.click();
		await expect(inventoryPage.navigationMenu).not.toBeVisible();
	});

	test("should display all navigation menu links", async () => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await expect(inventoryPage.navigationMenuLinks).toHaveCount(5);
		await expect(inventoryPage.navigationMenuLinks).toHaveText([
			"All Items",
			"Dynamic Catalog",
			"About",
			"Logout",
			"Reset App State",
		]);
	});

	test("should display the Dynamic Catalog submenu", async () => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await inventoryPage.navigationMenuLinks
			.getByText("Dynamic Catalog")
			.click();
		await expect(inventoryPage.navigationSubMenu).toBeVisible();
		await expect(inventoryPage.navigationSubLinks).toHaveCount(3);
		await expect(inventoryPage.navigationSubLinks).toHaveText([
			"Lazy Load",
			"Spinner",
			"Slider",
		]);
	});

	test("should navigate to the Inventory page when clicking All Items", async ({
		page,
	}) => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await inventoryPage.navigationMenuLinks.getByText("All Items").click();
		await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
	});

	test("should navigate to the Sauce Labs website when clicking About", async ({
		page,
	}) => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await inventoryPage.navigationMenuLinks.getByText("About").click();
		await expect(page).toHaveURL("https://saucelabs.com/");
	});

	test("should log out the user from the navigation menu", async ({ page }) => {
		await inventoryPage.hamburgerMenu.click();
		await expect(inventoryPage.navigationMenu).toBeVisible();
		await inventoryPage.navigationMenuLinks.getByText("Logout").click();
		await expect(page).toHaveURL("https://www.saucedemo.com/");
	});
});
