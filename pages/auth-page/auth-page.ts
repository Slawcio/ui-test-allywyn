import test, { expect, Page } from "@playwright/test";
import BasePage from "../base-page";

export default class AuthPage extends BasePage {

    static override skipVisibilityCheck: string[] = ['errorLabel', 'errorCloseButton'];
    
    constructor(page: Page) {
        super(page);
    }
    
    get usernameInput() { return this.page.locator('[data-test="username"]');}
    get passwordInput() { return this.page.locator('[data-test="password"]');}
    get loginButton() { return this.page.locator('[data-test=login-button]');}
    get loginCredsContainer() { return this.page.locator('[data-test=login-credentials]');}
    get passwordCredContainer() { return this.page.locator('[data-test=login-password]');}

    get errorLabel() { return this.page.locator('[data-test="error"]'); }
    get errorCloseButton() { return this.page.locator('[data-test="error-button"]'); }
    
    async login(username: string, password: string): Promise<void> {
        await test.step('login action', async () => { // can add creds if doesn't violate security
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }

    async assertErrorShown(errorMessage: string): Promise<void> {
        await this.errorLabel.isVisible();

        const errorCloseButton = this.errorCloseButton;
        await expect(errorCloseButton).toBeVisible();
        await expect(errorCloseButton).toBeEnabled();
        await expect(this.usernameInput).toContainClass('input_error');
        await expect(this.passwordInput).toContainClass('input_error');
        await expect(this.errorLabel).toContainText(errorMessage);
    }
}