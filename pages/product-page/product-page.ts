import { expect, Locator, test, Page } from "@playwright/test";
import BasePage from "../base-page";
import Header from "../header/header";
import { PageContext, ProductType } from "../../types";
import { ParsedProduct } from "../../tests/data/product-scrap-object";
import ItemView from "../item-view/item-view";

export default class Product extends BasePage {

    // static override readonly skipVisibilityCheck = ['removeButton'];
    private readonly header;

    constructor(protected readonly page: Page) {
        super(page);
        this.header = new Header(page)
    }

    // async assertProductData(product: ProductType): Promise<void> {
    //     await test.step(`check '${product.name}' data on product page`, async ()=> {
    //         await expect(this.name).toHaveText(product.name);
    //         await expect(this.description).toHaveText(product.desc);
    //         await expect(this.price).toHaveText(`$${product.price}`)
    //         expect(await this.img.getAttribute('src')).toContain(product.imgSrc)
    //     })
    // }

    async getItem(): Promise<ItemView> { return await ItemView.getItem(this.page, PageContext.ProductPage); }
    
    get headerObject(): Header { return this.header; }
    // get container(): Locator { return this.page.locator('[data-test="inventory-item"]'); }
    // get img(): Locator { return this.container.locator('img'); }
    // get name(): Locator { return this.container.locator('[data-test=inventory-item-name]'); }
    // get description(): Locator { return this.container.locator('[data-test=inventory-item-desc]'); }
    // get price(): Locator { return this.container.locator('[data-test=inventory-item-price]'); }
    // get addToCartButton(): Locator { return this.container.locator('[data-test=add-to-cart]'); }
    // get removeButton(): Locator { return this.container.locator('[data-test=remove]'); }
    get backToInventory(): Locator { return this.page.locator('[data-test=back-to-products]'); }

}