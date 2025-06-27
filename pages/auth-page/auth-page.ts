import { Page } from "@playwright/test";
import BasePage from "../base-page";

export default class AuthPage extends BasePage {
    
    constructor(page: Page) {
        super(page);
    }
    
    get usernameInput() { return this.page.locator('[data-test="username"]');}
    get passwordInput() { return this.page.locator('[data-test="password"]');}
    get loginButton() { return this.page.locator('[data-test=login-button]');}
    get loginCredsContainer() { return this.page.locator('[data-test=login-credentials]');}
    get passwordCredContainer() { return this.page.locator('[data-test=login-password]');}

    // get errorLabel() { return this.page.locator('[data-test="error"]'); }
    // get errorCloseButton() { return this.page.locator('[data-test="error-button"]'); }

    get errorClassName() { return "error"; }
    
async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}