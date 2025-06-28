import { test, expect } from '@playwright/test';
import { openPage } from '../common-steps/common-steps';
import { Inventory } from '../../pages/dom-pages/product-pages/inventory-page';
import { Product } from '../../pages/dom-pages/product-pages/product-page';
import { HeaderView } from '../../pages/header-view/header';
import { Cart } from '../../pages/dom-pages/product-pages/cart-page';
import { SortOption, URLS } from '../data/data';

test.describe('Buying features', {tag: ['@buying-features']},() => {
  
  test.beforeEach(async ({ page }) => {
    await openPage(page, URLS.INVENTORY);
  });

  test.describe('removing from cart',{tag: ['@removing']}, async ()=> {
    test('remove from cart on inventory', async ({page}) => {
        const itemAmount = 6;
        const inventory = new Inventory(page);
        const items = await inventory.addToCartItems({count: itemAmount});
        await inventory.removeFromCartItems(items);
    });

    test('remove from cart on product page', async ({page})=> {
        let itemAmount = 6;
        const inventory = new Inventory(page);
        const itemsOnInventory = await inventory.addToCartItems({count: itemAmount});
        const header = new HeaderView(page);
        for(const itemOnInventory of itemsOnInventory){
            await itemOnInventory.name.click();
            const productPage = new Product(page);
            await productPage.assertAllPageLocatorsVisible();
            await (await productPage.getItem()).removeButton.click();
            itemAmount--;
            await header.assertAmountOnCart(itemAmount);
            await productPage.backToInventory.click();
            await expect(itemOnInventory.removeButton).toBeHidden();
            await expect(itemOnInventory.addToCartButton).toBeVisible();
        }
    });

    test('remove from cart on cart ^^', async ({page})=> {
        let itemAmount = 6;
        const inventory = new Inventory(page);
        await inventory.addToCartItems({count: itemAmount});
        await new HeaderView(page).shoppingCart.click();
        const cart = new Cart(page);
        await cart.assertAllPageLocatorsVisible();
        const itemsOnCart = await cart.getItemsList();

        const header = new HeaderView(page);
        for(let leftItems = itemAmount - 1; leftItems >= 0; leftItems--){
            await itemsOnCart[leftItems].removeButton.click();
            await header.assertAmountOnCart(leftItems);
        }

        await cart.continueShoppingButton.click();
        const itemsOnInventoryAfterRemovingFromCart = await inventory.getItemsList();
        for(const item of itemsOnInventoryAfterRemovingFromCart){
            expect(item.addToCartButton).toBeVisible();
            expect(item.addToCartButton).toBeEnabled();
            expect(item.removeButton).toBeHidden();
        }
    });
    });
  
    test.describe('sorting',{tag: ['@filtering']}, async ()=> {

        for(const sortToSelect of Object.values(SortOption)){
            test(`sorting ${sortToSelect}`, async ({page}) => {
                const inventory = new Inventory(page);
                await inventory.selectSortOption(sortToSelect);
                await inventory.assertSortingCorrect(sortToSelect);
            });
        }
    });

});
