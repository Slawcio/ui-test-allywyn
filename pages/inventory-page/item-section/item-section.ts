import { Locator, Page } from "@playwright/test";
import BasePage from "../../base-page";

// item on inventory page
export default class ItemInventoryView extends BasePage {

    private static readonly itemSelector = '[data-test="inventory-item"]';
    private static readonly itemNameSelector = '[data-test="inventory-item-name"]';

    constructor(protected readonly page: Page, protected readonly itemLocator: Locator) {
        super(page);
    }


    // static factory for item by name
    static async itemRowByName(page: Page, name: string): Promise<ItemInventoryView> {
            return new ItemInventoryView(
                page,
                page.locator(ItemInventoryView.itemSelector).filter( { hasText: name })
            ); 
    }

    // static factory for rows of items
    static async itemRows(page: Page): Promise<ItemInventoryView[]> {
        const items = page.locator(ItemInventoryView.itemSelector);
        const count = await items.count()
        const itemRows: ItemInventoryView[] = [];
        for(let i = 0; i < count; i++){
            itemRows.push(new ItemInventoryView(page, items.nth(i)));
        }
        return itemRows;
    }

    get img() { return this.itemLocator.locator('img'); }
    get name() { return this.itemLocator.locator('[data-test=inventory-item-name]'); }
    get description() { return this.itemLocator.locator('[data-test=inventory-item-desc]'); }
    get price() { return this.itemLocator.locator('[data-test=inventory-item-price]'); }
    get addToCartButton() { return this.itemLocator.locator('[data-test^="add-to-cart-"]'); }
    get removeButton() { return this.itemLocator.locator('[data-test^="remove-"]'); }

}