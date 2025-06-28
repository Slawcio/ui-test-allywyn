import { Page, Locator, expect, test } from "@playwright/test";

export abstract class BasePage {
    [key: string]: unknown;

    protected readonly page: Page;
    protected readonly skipVisibility?: string[]
    
    constructor(page: Page, skipVisibility ?: string[]) {
        this.page = page;
        this.skipVisibility = skipVisibility;
    }

    async assertAllPageLocatorsVisible(): Promise<void> {
        const props = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this));
        const skipList = this.skipVisibility ?? [];

        for (const [locatorName, descriptor] of Object.entries(props)) {
            if (typeof descriptor.get === 'function' && !skipList.includes(locatorName)) {
                const locator = this[locatorName] as Locator;

                
                if (locator && typeof locator === 'object' && typeof locator.isVisible === 'function') {
                        await test.step(`Visibility of: '${locatorName}' on ${this.page.url()}`, async () => {
                            await expect(locator).toBeVisible();
                        });   
                }       
            }
        }
    }
    
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    get root(): Locator {
        return this.page.locator('#root');
    }

}
