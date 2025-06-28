import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class HeaderView extends BasePage {

    constructor(protected readonly page: Page) {
        super(page);
    }

    static getHeader(page: Page){
        return new HeaderView(page);
    }
  
    get header(): Locator { return this.page.locator("[data-test=primary-header]"); }
    get shoppingCart(): Locator { return this.page.locator("[data-test=shopping-cart-link]"); }
    get shoppingCartBadge(): Locator { return this.page.locator("[data-test=shopping-cart-badge]"); }
    get logo(): Locator { return this.page.locator(".app_logo"); }
    get burgerMenuButton(): Locator { return this.page.locator("#react-burger-menu-btn"); }
}