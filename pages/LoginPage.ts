import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.getByRole("alert");
  }
  async goTo() {
    await this.page.goto("https://www.saucedemo.com/");
  }
  async login(usr: string, psw: string) {
    await this.username.fill(usr);
    await this.password.fill(psw);
    await this.loginButton.click();
  }
  }
