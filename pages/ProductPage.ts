import { expect,type Locator, type Page } from "@playwright/test";


export class ProductPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async expectProductPage(id: number) {
        await expect(this.page).toHaveURL(
            new RegExp(`inventory-item\\.html\\?id=${id}`)
        );
    }
}
