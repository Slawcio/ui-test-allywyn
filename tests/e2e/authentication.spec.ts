import { faker } from "@faker-js/faker";
import { LoginOutcome, loginTestData } from "../data/data";
import { test } from "@playwright/test";
import { AuthPage}  from "../../pages/dom-pages/auth-page";
import { Inventory } from "../../pages/dom-pages/product-pages/inventory-page";

const names = loginTestData.name;

const users = [
    { desc: "valid credentials", name: names.standard, password: loginTestData.password, result: LoginOutcome.SUCCESS },
    { desc: "invalid password", name: names.standard, password: faker.string.sample(), result: LoginOutcome.FAILURE },
    { desc: "invalid username", name: faker.internet.email(), password: loginTestData.password, result: LoginOutcome.FAILURE },
    { desc: "no name", name: "", password: loginTestData.password, result: LoginOutcome.USERNAME_REQ },
    { desc: "no password", name: names.standard, password: "", result: LoginOutcome.PASSWORD_REQ },
    { desc: "no credentials", name: "", password: "", result: LoginOutcome.USERNAME_REQ },
    { desc: "user locked", name: names.lockedOut, password: loginTestData.password, result: LoginOutcome.LOCKED },
];

test.describe('Login tests - data driven', { tag: ['@login', '@all'] }, async () => {
    for (const user of users) {
        test(user.desc, async ({ page }) => {
            const authPage = new AuthPage(page);

            await page.goto('/');
            await authPage.assertAllPageLocatorsVisible();
            await test.step(`login attempt, expected ${user.result}`, async ()=> {
                await authPage.login(user.name, user.password);

                switch (user.result) {
                    case LoginOutcome.SUCCESS: {
                        const inventoryPage = new Inventory(page);
                        await inventoryPage.assertAllPageLocatorsVisible();
                        break;
                    }
                    case LoginOutcome.FAILURE: {
                        await authPage.assertErrorShown('Epic sadface: Username and password do not match any user in this service');
                        break;
                    }
                    case LoginOutcome.LOCKED: {
                        await authPage.assertErrorShown('Epic sadface: Sorry, this user has been locked out.');
                        break;
                    }
                    case LoginOutcome.USERNAME_REQ: {
                        await authPage.assertErrorShown('Epic sadface: Username is required');
                        break;
                    }
                    case LoginOutcome.PASSWORD_REQ: {
                        await authPage.assertErrorShown('Epic sadface: Password is required');
                        break;
                    }
                    default:
                    throw new Error(`Unhandled login result: ${user.result}`);
                }   
            });
        });
    }
});