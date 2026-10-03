import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("Inventory", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.login("standard_user", "secret_sauce");

  });

  test("Checking UI and necessary components"){
    
  }

 });
