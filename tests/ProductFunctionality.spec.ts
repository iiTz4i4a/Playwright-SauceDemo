import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe("Product Functionality", () => {
	let loginPage: LoginPage;
	let inventoryPage: InventoryPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		inventoryPage = new InventoryPage(page);
		cartPage = new CartPage(page);

		await loginPage.goTo();
		await loginPage.login("standard_user", "secret_sauce");
	});

	test("should add one inventory item to the cart", async () => {
		await inventoryPage.inventoryItemCartButton.first().click();
		await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
		await inventoryPage.shoppingCartIcon.click();
		await expect(
			cartPage.cartItem.getByText("Sauce Labs Backpack"),
		).toBeVisible();
		await expect(
			cartPage.cartItem.getByText(
				"carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
			),
		).toBeVisible();
		await expect(cartPage.cartItem.getByText("$29.99")).toBeVisible()
	});

	test("should remove an item from the cart", async () => {
		await inventoryPage.inventoryItemCartButton.first().click();
		await expect(inventoryPage.shoppingCartBadge).toBeVisible();
		await expect(inventoryPage.shoppingCartBadge).toHaveText("1");
		await inventoryPage.shoppingCartIcon.click();
		await expect(cartPage.cartItem.getByText("Sauce Labs Backpack")).toBeVisible();
		await cartPage.cartItemRemoveButton.click();
		await expect(cartPage.cartItem).toHaveCount(0)
	});

	test("should add all inventory items to the cart", async () => {
		let count = 1;
		await expect(inventoryPage.inventoryItem).toHaveCount(6);
		for (const item of await inventoryPage.inventoryItem.all()) {
			await item.getByRole("button", { name: "Add to cart" }).click();
			await expect(inventoryPage.shoppingCartBadge).toHaveText(String(count));
			count++;
		}
		await expect(inventoryPage.shoppingCartBadge).toHaveText("6");
	});

	test("should clear Cart after adding all inventory items to the cart", async () => {
    let count = 1;
    await expect(inventoryPage.inventoryItem).toHaveCount(6);
    for (const item of await inventoryPage.inventoryItem.all()) {
        await item.getByRole("button", { name: "Add to cart" }).click();
        await expect(inventoryPage.shoppingCartBadge).toHaveText(String(count));
        count++;
    }
    await expect(inventoryPage.shoppingCartBadge).toHaveText("6");
    await inventoryPage.shoppingCartIcon.click();
    await expect(cartPage.cartItem).toHaveCount(6);
    while (await cartPage.cartItem.count() > 0) {
        await cartPage.cartItem
            .first()
            .getByRole("button", { name: "Remove" })
            .click();
    }
    await expect(cartPage.cartItem).toHaveCount(0);
	});

	test("should change Add to Cart button to Remove after adding an item", async () => {
		const firstItem = inventoryPage.inventoryItem.first();
		await firstItem.getByRole("button", { name: "Add to cart" }).click();
		await expect(
			firstItem.getByRole("button", { name: "Remove" }),
		).toBeVisible();
	});
});
