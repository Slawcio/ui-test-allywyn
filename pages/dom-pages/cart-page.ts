import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';
import { ItemView } from '../item-view/item-view';
import { PageContext } from '../../types';

export class Cart extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    get continueShoppingButton(): Locator { return this.page.locator('[data-test="continue-shopping"]'); }
    get checkoutButton(): Locator { return this.page.locator('[data-test="checkout"]'); }

    async itemByName(name: string): Promise<ItemView> { 
        return await ItemView.getItemByName(this.page, name, PageContext.Cart);
    }

    async getItemsList(): Promise<ItemView[]> {
        return await ItemView.getItems(this.page, PageContext.Cart);
    }
}
