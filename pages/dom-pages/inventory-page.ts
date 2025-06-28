import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base-page';
import { HeaderView } from '../header-view/header';
import { ItemView } from '../item-view/item-view';
import { PageContext } from '../../types';

export class Inventory extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    async itemByName(name: string): Promise<ItemView> { 
        return await ItemView.getItemByName(this.page, name, PageContext.Inventory);
    }

    async getItemsList(): Promise<ItemView[]> {
        return await ItemView.getItems(this.page, PageContext.Inventory);
    }
    get inventoryContainer(): Locator { return this.page.locator('[data-test="inventory-container"]'); }
    get inventoryList(): Locator { return this.page.locator('[data-test="inventory-list"]'); }
    get filterDropdown(): Locator { return this.page.locator('[data-test="product-sort-container"]'); }

    get getShoppingCart(): Locator { return HeaderView.getHeader(this.page).shoppingCart};

}
