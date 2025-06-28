import { Page, Locator } from '@playwright/test';
import BasePage from '../base-page';
import Header from '../header/header';
import ItemView from '../item-view/item-view';
import { PageContext } from '../../types';

export default class Inventory extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    get inventoryContainer(): Locator { return this.page.locator('[data-test="inventory-container"]'); }
    get inventoryList(): Locator { return this.page.locator('[data-test="inventory-list"]'); }
    get filterDropdown(): Locator { return this.page.locator('[data-test="product-sort-container"]'); }

    get getShoppingCart(): Locator { return Header.getHeader(this.page).shoppingCart};

    // get itemByName(): (name: string) => Locator { return (name: string): Locator => this.page.locator(`[data-test="inventory-item-name"]`, { hasText: name }); }
    // get itemByName(page): ItemInventoryView { new ItemInventoryView(page)}
    
    // async getItemsList(): Promise<ItemInventoryView[]> {
    //     const inventoryItems: Locator = this.page.locator('[data-test="inventory-item"]');
    //     const count: number = await inventoryItems.count();
    //     const inventoryItemObjects: ItemInventoryView[] = [];
        
    //      for (let i = 0; i < count; i++) {
    //       inventoryItemObjects.push(new ItemInventoryView(this.page, inventoryItems.nth(i)));
    //     }

    //     return inventoryItemObjects;
    // }

    async itemByName(name: string): Promise<ItemView> { 
        return await ItemView.getItemByName(this.page, name, PageContext.Inventory);
    }

    async getItemsList(): Promise<ItemView[]> {
        return await ItemView.getItems(this.page, PageContext.Inventory);
    }


}
