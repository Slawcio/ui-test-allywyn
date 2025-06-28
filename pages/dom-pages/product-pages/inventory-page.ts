import test, { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../base-page';
import { HeaderView } from '../../header-view/header';
import { ItemView } from '../../item-view/item-view';
import { PageContext, PurchaseOptions } from '../../../types';

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

    // add to cart on Inventory Page with PurchaseOptions -> {range: [i, n]} || {names: ['']} || {count: n}
    // example on range: {range: [1, 1]} will buy first item, {range: [2, 3]}, will 2nd and 3rd
    async addToCartItems(options: PurchaseOptions): Promise<ItemView[]> {
        const header = new HeaderView(this.page);

        const allItems = await this.getItemsList(); // get all visible items
        
        let itemsToBuy: ItemView[] = [];
        if (options.names) {
            for (const name of options.names) {
            itemsToBuy.push(await this.itemByName(name));
            }
        } else if (options.range) {
            const [start, end] = options.range;
            itemsToBuy = allItems.slice(start - 1, end);
        } else if (options.count) {
            itemsToBuy = allItems.slice(0, options.count);
        } else {
            throw new Error("No valid purchase option provided.");
        }

        for (const item of itemsToBuy) {
            await item.addToCartButton.click();
            await item.removeButton.isVisible();
            await item.removeButton.isEnabled();
        }

        // check cart
        const itemsToBuyAmount = itemsToBuy.length;
        await header.assertAmountOnCart(itemsToBuyAmount);

        return itemsToBuy;
    }

    async removeFromCartItems(itemsToRemove: ItemView[]){
        const header = new HeaderView(this.page);
        
        for(const item of itemsToRemove){
            await item.removeButton.click();
            expect(item.addToCartButton).toBeVisible();
        }
                await header.assertAmountOnCart(0);
    }

    get inventoryContainer(): Locator { return this.page.locator('[data-test="inventory-container"]'); }
    get inventoryList(): Locator { return this.page.locator('[data-test="inventory-list"]'); }
    get filterDropdown(): Locator { return this.page.locator('[data-test="product-sort-container"]'); }

}
