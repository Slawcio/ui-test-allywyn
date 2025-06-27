import { Page } from "@playwright/test";

const commonSteps = {
    openPage: async (page: Page, url = '/'): Promise<void> => {
            await page.goto(url);
            await page.waitForLoadState('networkidle');
    }
}

export default commonSteps;