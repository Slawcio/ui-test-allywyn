import { expect, Page } from "@playwright/test";
import { Inventory } from "../../pages/dom-pages/inventory-page";
import { HeaderView } from "../../pages/header-view/header";
import { ItemView } from "../../pages/item-view/item-view";
import { PurchaseOptions } from "../../types";

export const openPage = async (page: Page, url = '/'): Promise<void> => {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
}

export async function addToCartItems(page: Page, options: PurchaseOptions): Promise<ItemView[]> {
    const inventory = new Inventory(page);
    const header = new HeaderView(page);

    await inventory.assertAllPageLocatorsVisible();
    const allItems = await inventory.getItemsList(); // get all visible items
    
    let itemsToBuy: ItemView[] = [];
    if (options.names) {
        for (const name of options.names) {
           itemsToBuy.push(await inventory.itemByName(name));
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
    await expect(header.shoppingCartBadge).toHaveText(itemsToBuy.length.toString());

    return itemsToBuy;
}