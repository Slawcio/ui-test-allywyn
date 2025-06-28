import test, { expect } from "@playwright/test";
import { openPage } from "../common-steps/common-steps";
import { products, URLS } from "../data/data";
import { Inventory } from "../../pages/dom-pages/product-pages/inventory-page";
import { Product } from "../../pages/dom-pages/product-pages/product-page";

// TODO
test.describe('visual regression tests', {tag: ['@visual', '@smoke']},() => {

    test('inventory page', async ({page}) => {
        await openPage(page, URLS.INVENTORY);
        const inventory = new Inventory(page);
        await inventory.assertAllPageLocatorsVisible();
        await expect(inventory.root).toHaveScreenshot();
    });

    for(const product of Object.values(products)){
        test(`product page of ${product.name}`, async ({page})=> {
            await openPage(page, URLS.INVENTORY);
            const inventory = new Inventory(page);
            const item = await inventory.itemByName(product.name);
            await item.name.click();
            
            const productPage = new Product(page);
            productPage.assertAllPageLocatorsVisible();

            await expect(productPage.root).toHaveScreenshot();
        });
    }

});
