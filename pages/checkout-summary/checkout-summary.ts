import { Page, Locator } from '@playwright/test';
import BasePage from '../base-page';
import ItemRow from '../sections/item-row';

export default class CheckoutSummary extends BasePage {

    constructor(page: Page) {
      super(page);
    }

    async getItemByName(name: string): Promise<ItemRow> { return ItemRow.itemRowByName(this.page, name); }

    async getItemsList(): Promise<ItemRow[]> { return ItemRow.itemRows(this.page); }

    get paymentInfoLabel(): Locator { return this.page.locator('[data-test=payment-info-label]'); }
    get paymentInfoValue(): Locator { return this.page.locator('[data-test=payment-info-value]'); }
    get shippingInfoLabel(): Locator { return this.page.locator('[data-test=shipping-info-label]'); }
    get shippingInfoValue(): Locator { return this.page.locator('[data-test=shipping-info-value]'); }
    get totalInfoLabel(): Locator { return this.page.locator('[data-test=total-info-label]'); }
    get itemTotalCost(): Locator { return this.page.locator('[data-test=subtotal-label]'); }
    get taxCost(): Locator { return this.page.locator('[data-test=tax-label]'); }
    get totalCost(): Locator { return this.page.locator('[data-test=total-label]'); }

    get cancel(): Locator { return this.page.locator('[data-test=cancel]'); }
    get finish(): Locator { return this.page.locator('[data-test=finish]'); }

}
