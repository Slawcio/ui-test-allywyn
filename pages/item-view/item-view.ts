import { Page, Locator, expect, test } from '@playwright/test';
import { BasePage } from '../base-page';
import { PageContext, ProductType } from '../../types';
import { ParsedProduct } from '../../tests/data/product-scrap-object';

// general ItemView and properties on Inventory, Product, Cart, Checkouts pages 
export class ItemView extends BasePage {


    private static readonly itemSelector = '[data-test="inventory-item"]';
    private static readonly itemNameSelector = '[data-test="inventory-item-name"]';

    constructor(protected readonly page: Page, protected readonly itemLocator: Locator, private context: PageContext) {
        const skipElements: string[] = [];
        switch(context){
            case PageContext.Summary:
                skipElements.push('img', 'addToCartButton', 'removeButton')
                break;
            case PageContext.ProductPage:
                skipElements.push('quantity', 'removeButton');
                break;
            case PageContext.Cart:
                skipElements.push('img', 'addToCartButton');
                break;
        }

        super(page, skipElements);
    }

    // static factory for item (on product page most likely)
    static async getItem(page: Page, context: PageContext): Promise<ItemView> {
        return new ItemView(
            page,
            page.locator(ItemView.itemSelector),
            context
        ); 
    }

    // static factory for list of items
    static async getItems(page: Page, context: PageContext): Promise<ItemView[]> {
        const items = page.locator(ItemView.itemSelector);
        const count = await items.count()
        const itemRows: ItemView[] = [];
        for(let i = 0; i < count; i++){
            itemRows.push(new ItemView(page, items.nth(i), context));
        }
        return itemRows;
    }

    // static factory for item by name on list of items
    static async getItemByName(page: Page, name: string, context: PageContext): Promise<ItemView> {
            return new ItemView(
                page,
                page.locator(ItemView.itemSelector).filter( { hasText: name }),
                context
            ); 
    }

    // compare data with predefined product in row
    async assertProductDataAccuracyInRow(productData: ProductType): Promise<void>{
        expect(await this.price.textContent()).toContain(productData.price.toString());
        expect(await this.name.textContent()).toContain(productData.name);
        expect(await this.description.textContent()).toContain(productData.desc);
    }

    // compare data with predefined product in product view
    async assertProductDataAccuracyInProductView(productData: ProductType): Promise<void>{
        await this.assertProductDataAccuracyInRow(productData);
        expect(await this.img.getAttribute('src')).toContain(productData.imgSrc);
    }

    // compare data with scrapped product details from inventory page 
    async assertProductDataFromInventory(product: ParsedProduct): Promise<void> {
        await test.step(`check scrapped '${product.name}' data from inventory on its product page`, async ()=> {
            await expect(this.name).toHaveText(product.name);
            await expect(this.description).toHaveText(product.description);
            await expect(this.price).toHaveText(`${product.price}`)
            expect(await this.img.getAttribute('src')).toContain(product.imgSrc)
        })
    }

    // item elements
    get name(): Locator { return this.itemLocator.locator(ItemView.itemNameSelector); }
    get img(): Locator { return this.itemLocator.locator('img'); }
    get quantity(): Locator { return this.itemLocator.locator('[data-test="item-quantity"]'); }
    get description(): Locator { return this.itemLocator.locator('[data-test="inventory-item-desc"]'); }
    get price(): Locator { return this.itemLocator.locator('[data-test="inventory-item-price"]'); }
    get addToCartButton(): Locator { return this.itemLocator.locator('[data-test^="add-to-cart"]'); }
    get removeButton(): Locator { return this.itemLocator.locator('[data-test^="remove"]'); }

    // // labels over item rows
    // get quantityLabel(): Locator { return this.page.locator('[data-test=cart-quantity-label]')}
    // get cartDescLabel(): Locator { return this.page.locator('[data-test=cart-desc-label]')}
}
