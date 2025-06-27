import { Page, Locator } from '@playwright/test';
import { fa, faker } from '@faker-js/faker';
import BasePage from '../base-page';

export default class CheckoutPersonal extends BasePage {

    static override readonly skipVisibilityCheck = ['errorMsg'];

    constructor(page: Page) {
      super(page);
    }

    get firstName(): Locator { return this.page.locator('[data-test="firstName"]'); }
    get lastName(): Locator { return this.page.locator('[data-test="lastName"]'); }
    get postalCode(): Locator { return this.page.locator('[data-test="postalCode"]'); }
    get cancel(): Locator { return this.page.locator('[data-test="cancel"]'); }
    get continue(): Locator { return this.page.locator('[data-test="continue"]'); }

    // // error popup info
    // get errorMsg(): Locator { return this.page.locator('[data-test="error"]'); }
    // get errorButton(): Locator { return this.page.locator('[data-test="error-button"]'); }

    async fillCorrectData() {
      await this.firstName.fill(faker.internet.email());
      await this.lastName.fill(faker.person.lastName());
      await this.postalCode.fill(faker.location.zipCode());
    }
}
