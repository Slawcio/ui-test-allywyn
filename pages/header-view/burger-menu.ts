import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

class BurgerMenu extends BasePage {

    constructor(protected readonly page: Page) {
        super(page);
    }

    get exitButton(): Locator { return this.page.locator("#react-burger-cross-btn"); }
    get allItemsLink(): Locator { return this.page.locator("#inventory_sidebar_link"); }
    get aboutLink(): Locator { return this.page.locator("#about_sidebar_link"); }
    get logoutLink(): Locator { return this.page.locator("#logout_sidebar_link"); }
    get resetAppStateLink(): Locator { return this.page.locator("#reset_sidebar_link"); }

}