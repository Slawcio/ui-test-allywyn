import { Page, Locator } from '@playwright/test';
import BasePage from '../base-page';
import ItemSection from './item-section/item-section';

export default class Inventory extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    get inventoryContainer(): Locator { return this.page.locator('[data-test="inventory-container"]'); }
    get inventoryList(): Locator { return this.page.locator('[data-test="inventory-list"]'); }
    get itemByName(): (name: string) => Locator { return (name: string): Locator => this.page.locator(`[data-test="inventory-item-name"]`, { hasText: name }); }

    get filterDropdown(): Locator { return this.page.locator('[data-test="product-sort-container"]'); }

    async getItemsList(): Promise<ItemSection[]> {
        const inventoryItems: Locator = this.page.locator('[data-test="inventory-item"]');
        const count: number = await inventoryItems.count();
        const inventoryItemObjects: ItemSection[] = [];
        
         for (let i = 0; i < count; i++) {
          inventoryItemObjects.push(new ItemSection(this.page, inventoryItems.nth(i)));
        }

        return inventoryItemObjects;
    }
}
