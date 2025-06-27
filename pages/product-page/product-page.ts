import { Locator, Page } from "@playwright/test";
import BasePage from "../base-page";
import Header from "../header/header";

export default class Product extends BasePage {

    static override readonly skipVisibilityCheck = ['removeButton'];
    private readonly header;

    constructor(protected readonly page: Page) {
        super(page);
        this.header = new Header(page)
    }

    get headerObject(): Header { return this.header; }
    get container(): Locator { return this.page.locator('[data-test="inventory-item"]'); }
    get img(): Locator { return this.container.locator('img'); }
    get name(): Locator { return this.container.locator('[data-test=inventory-item-name]'); }
    get description(): Locator { return this.container.locator('[data-test=inventory-item-desc]'); }
    get price(): Locator { return this.container.locator('[data-test=inventory-item-price]'); }
    get addToCartButton(): Locator { return this.container.locator('[data-test=add-to-cart]'); }
    get removeButton(): Locator { return this.container.locator('[data-test=remove]'); }

}