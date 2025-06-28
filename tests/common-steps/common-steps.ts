import { expect, Page } from "@playwright/test";
import { Inventory } from "../../pages/dom-pages/product-pages/inventory-page";
import { HeaderView } from "../../pages/header-view/header";
import { ItemView } from "../../pages/item-view/item-view";
import { PurchaseOptions } from "../../types";

export const openPage = async (page: Page, url = '/'): Promise<void> => {
    await page.goto(url);
    await page.waitForLoadState('networkidle');
}