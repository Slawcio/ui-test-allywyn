import { Page, Locator, expect, test } from '@playwright/test';
import BasePage from '../base-page';
import { Product } from '../../types';

export default class ItemRow extends BasePage {

    static override readonly skipVisibilityCheck = ['removeButton'];

    private readonly itemRow: Locator;
    private static readonly ITEM_SELECTOR = '[data-test="inventory-item"]';
    private static readonly ITEM_NAME_SELECTOR = '[data-test="inventory-item-name"]';

    constructor(protected readonly page: Page, protected readonly itemLocator: Locator) {
        super(page);
        this.itemRow = itemLocator;
    }

    // static factory for rows of items
    static async itemRows(page: Page): Promise<ItemRow[]> {
        const items = page.locator(ItemRow.ITEM_SELECTOR);
        const count = await items.count()
        const itemRows: ItemRow[] = [];
        for(let i = 0; i < count; i++){
            itemRows.push(new ItemRow(page, items.nth(i)));
        }
        return itemRows;
    }

    // static factory for item by name
    static async itemRowByName(page: Page, name: string): Promise<ItemRow> {
            return new ItemRow(
                page,
                page.locator(ItemRow.ITEM_SELECTOR).filter( { hasText: name })
            ); 
    }

    async assertDataAccuracy(productData: Product): Promise<void>{
        expect(this.price).toContainText(productData.price.toString());
        expect(this.name).toContainText(productData.name);
        expect(this.description).toContainText(productData.desc);
    }

    async assertDataAccuracOnCart(productData: Product): Promise<void>{
        await this.assertDataAccuracy(productData);
        expect(this.removeButton).toBeVisible();
        expect(this.removeButton).toBeEnabled();
    }

    // item row elements
    get name(): Locator { return this.itemRow.locator(ItemRow.ITEM_NAME_SELECTOR); }
    get quantity(): Locator { return this.itemRow.locator('[data-test="item-quantity"]'); }
    get description(): Locator { return this.itemRow.locator('[data-test="inventory-item-desc"]'); }
    get price(): Locator { return this.itemRow.locator('[data-test="inventory-item-price"]'); }
    get removeButton(): Locator { return this.itemRow.locator('[data-test="remove"]'); }

    // labels over item rows
    get quantityLabel(): Locator { return this.page.locator('[data-test=cart-quantity-label]')}
    get cartDescLabel(): Locator { return this.page.locator('[data-test=cart-desc-label]')}
}
