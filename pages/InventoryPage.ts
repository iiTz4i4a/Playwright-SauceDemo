import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productHeader: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDescription: Locator;
  readonly inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeader = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]')
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
    this.inventoryItemDescription = page.locator('[data-test="inventory-item-desc"]')
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]')
  }
}
