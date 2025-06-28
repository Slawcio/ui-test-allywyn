import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { HeaderView } from "../header-view/header";
import { PageContext, ProductType } from "../../types";
import { ItemView } from "../item-view/item-view";

export class Product extends BasePage {

    private readonly headerView;

    constructor(protected readonly page: Page) {
        super(page);
        this.headerView = new HeaderView(page)
    }

    async getItem(): Promise<ItemView> { return await ItemView.getItem(this.page, PageContext.ProductPage); }
    
    get header(): HeaderView { return this.headerView; }
    get backToInventory(): Locator { return this.page.locator('[data-test=back-to-products]'); }

}