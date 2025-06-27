import {test as setup, expect, Page} from '@playwright/test';
import * as fs from 'fs';
import { Cookie } from "../types";
import path from "node:path";
import * as dotenv from 'dotenv';
import LoginPage from '../pages/auth-page/auth-page';
import Inventory from '../pages/inventory-page/inventory-page';
import { loginTestData } from '../tests/data/data';
dotenv.config();

const browser_state_file_path = path.join(__dirname, '../.auth/storage-state.json');

const authenticate = async (page: Page) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.login(loginTestData.name.standard, loginTestData.password);
        expect(page.url()).toContain('inventory.html');
        await page.waitForLoadState('networkidle');
        await new Inventory(page).inventoryContainer.isVisible();
        await page.context().storageState({path: browser_state_file_path});
};

setup('authenticate',  async ({ page }): Promise<void> => {
    const fileContent = fs.readFileSync(browser_state_file_path, 'utf-8');
    let data;
    try {
        data = JSON.parse(fileContent);
    } catch (e) {
        // storage_state.json is probably empty so run auth process
        await authenticate(page);
        return;
    }

    // Extract the id_token cookie
    const idTokenCookie = data.cookies.find((cookie: Cookie) => cookie.name === 'session-username');

    if (idTokenCookie) {
        const cookieExpires = idTokenCookie.expires;
        const currentTimestamp = Date.now() / 1000; // Current time in seconds
        // Check if the cookie is expired
        if (cookieExpires < currentTimestamp) {
            // cookie expired, run auth process
            await authenticate(page);
        }
    }
});