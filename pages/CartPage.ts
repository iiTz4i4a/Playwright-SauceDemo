import { type Locator, type Page } from "@playwright/test";

export class CartPage {
	readonly page: Page;
	readonly cartList: Locator;
	readonly cartItem: Locator;
	readonly cartItemName: Locator;
	readonly cartItemDescription: Locator;
	readonly cartItemPrice: Locator;
	readonly cartItemRemoveButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.cartList = page.locator("div.cart_list");
		this.cartItem = page.locator("div.cart_item_label");
		this.cartItemName = page.locator("div.inventory_item_name");
		this.cartItemDescription = page.locator("div.inventory_item_desc");
		this.cartItemPrice = page.locator("div.inventory_item_price");
		this.cartItemRemoveButton = page.locator("button#remove-sauce-labs-backpack")
	}
}
