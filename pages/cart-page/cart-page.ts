import { Page, Locator } from '@playwright/test';
import BasePage from '../base-page';
import ItemRow from '../sections/item-row';

export default class Cart extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    get continueShoppingButton(): Locator { return this.page.locator('[data-test="continue-shopping"]'); }
    get checkoutButton(): Locator { return this.page.locator('[data-test="checkout"]'); }

    async itemByName(name: string): Promise<ItemRow> { 
        return await ItemRow.itemRowByName(this.page, name);
    }

    async getItemsList(): Promise<ItemRow[]> {
        return await ItemRow.itemRows(this.page);
    }
}
