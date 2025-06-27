import { Locator, Page } from "@playwright/test";
import BasePage from "../../base-page";

export default class ItemSection extends BasePage {

    constructor(protected readonly page: Page, protected readonly itemLocator: Locator) {
        super(page);
    }

    get img() { return this.page.locator('img'); }
    get name() { return this.itemLocator.locator('[data-test=inventory-item-name]'); }
    get description() { return this.itemLocator.locator('[data-test=inventory-item-desc]'); }
    get price() { return this.itemLocator.locator('[data-test=inventory-item-price]'); }
    get addToCartButton() { return this.itemLocator.locator('[data-test^="add-to-cart-"]'); }
    get removeButton() { return this.itemLocator.locator('[data-test^="remove-"]'); }


}