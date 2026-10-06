import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly productHeader: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly inventoryItemDescription: Locator;
  readonly inventoryItemPrice: Locator;
  readonly inventoryItemImages: Locator;
  readonly inventoryItemCartButton: Locator;
  readonly shoppingCartIcon: Locator
  readonly shoppingCartBadge:Locator;
  readonly hamburgerMenu: Locator;
  readonly navigationMenu : Locator;
  readonly navigationMenuClose: Locator;
  readonly navigationMenuLinks: Locator;
  readonly navigationSubMenu: Locator;
  readonly navigationSubLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeader = page.locator('[data-test="title"]');
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]')
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]')
    this.inventoryItemDescription = page.locator('[data-test="inventory-item-desc"]')
    this.inventoryItemPrice = page.locator('[data-test="inventory-item-price"]')
    this.inventoryItemImages = page.locator("img.inventory_item_img")
    this.inventoryItemCartButton = page.getByRole("button",{name:"Add to cart"})
    this.shoppingCartIcon = page.locator("a.shopping_cart_link")
    this.hamburgerMenu = page.locator("button#react-burger-menu-btn")
    this.navigationMenu = page.locator("nav.bm-item-list")
    this.navigationSubMenu = page.locator("div#dynamic_catalog_submenu")
    this.navigationSubLinks = page.locator("a.menu-item.submenu-item")
    this.navigationMenuClose = page.locator("button#react-burger-cross-btn")
    this.navigationMenuLinks = page.locator("a.bm-item.menu-item")
    this.shoppingCartBadge = page.locator("span.shopping_cart_badge")
  }
}
