import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('Login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.login("standard_user","secret_sauce")
    await expect(page).toHaveURL( "https://www.saucedemo.com/inventory.html");
  });
});
