import { Page, Locator } from '@playwright/test';
import BasePage from '../base-page';

export default class CheckoutComplete extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    get checkoutCompleteContainer(): Locator { return this.page.locator('[data-test=checkout-complete-container]'); }
    get titleLabel(): Locator { return this.page.locator('[data-test="title"]'); }
    get checkmarkIcon(): Locator { return this.page.locator('[data-test=pony-express]'); }
    get completeHeader(): Locator { return this.page.locator('[data-test=complete-header]'); }
    get completeText(): Locator { return this.page.locator('[data-test=complete-text]'); }
    get backHomeButton(): Locator { return this.page.locator('[data-test=back-to-products]'); }

}