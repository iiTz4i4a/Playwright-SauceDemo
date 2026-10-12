import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Sorting Functionality", () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);

		await loginPage.goTo();
		await loginPage.login("standard_user", "secret_sauce");
	});

	test("should use Name (A to Z) as the default ", async () => {
		await expect(inventoryPage.sortContainer).toHaveValue("az");
	});
	//TODO: Not only first element we can check whole array
	test("should sort by name A → Z", async () => {
		await inventoryPage.sortContainer.selectOption({ label: "Name (A to Z)" });

		await expect(inventoryPage.inventoryItemName).toHaveText([
			"Sauce Labs Backpack",
			"Sauce Labs Bike Light",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Fleece Jacket",
			"Sauce Labs Onesie",
			"Test.allTheThings() T-Shirt (Red)",
		]);
	});

	test("should sort by Name (Z to A)", async () => {
		await inventoryPage.sortContainer.selectOption({ label: "Name (Z to A)" });

		await expect(inventoryPage.inventoryItemName).toHaveText([
			"Test.allTheThings() T-Shirt (Red)",
			"Sauce Labs Onesie",
			"Sauce Labs Fleece Jacket",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Bike Light",
			"Sauce Labs Backpack",
		]);
	});

	test("should sort by Price (low to high)", async () => {
		await inventoryPage.sortContainer.selectOption({
			label: "Price (low to high)",
		});

		await expect(inventoryPage.inventoryItemPrice).toHaveText([
			"$7.99",
			"$9.99",
			"$15.99",
			"$15.99",
			"$29.99",
			"$49.99",
		]);
	});

	test("should sort by Price (high to low)", async () => {
		await inventoryPage.sortContainer.selectOption({
			label: "Price (high to low)",
		});

		await expect(inventoryPage.inventoryItemPrice).toHaveText([
			"$49.99",
			"$29.99",
			"$15.99",
			"$15.99",
			"$9.99",
			"$7.99",
		]);
	});
});
