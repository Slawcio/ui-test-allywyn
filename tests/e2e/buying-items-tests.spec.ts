import { test, expect } from '@playwright/test';
import { openPage } from '../common-steps/common-steps';
import { Inventory } from '../../pages/dom-pages/product-pages/inventory-page';
import { Product } from '../../pages/dom-pages/product-pages/product-page';
import { CheckoutPersonal } from '../../pages/dom-pages/checkout/checkout-personal-page';
import { CheckoutSummary } from '../../pages/dom-pages/checkout/checkout-summary-page';
import { products, URLS } from '../data/data';
import { CheckoutComplete } from '../../pages/dom-pages/checkout/checkout-complete-page';
import { Cart } from '../../pages/dom-pages/product-pages/cart-page';
import { ParsedProduct } from '../data/product-scrap-object';
import { ProductType } from '../../types';
import { ItemView } from '../../pages/item-view/item-view';
import { HeaderView } from '../../pages/header-view/header';

test.describe('Buying tests', {tag: ['@buy-functionality', '@smoke']},() => {
  
  test.beforeEach(async ({ page }) => {
    await openPage(page, '/inventory.html');
  });

  test(`complete full checkout for ${products.bikeLight.name} and return to inventory`, {tag: ['@e2e','@buy-1-thingy']},async ({ page }) => {
    const product = products.bikeLight;

    // inventory page
    const inventoryPage = new Inventory(page);
    await inventoryPage.assertAllPageLocatorsVisible();
    const itemInventory = await inventoryPage.itemByName(product.name);
    await itemInventory.name.click();
    expect(page.url()).toContain(URLS.PRODUCT);

    // product page
    const productPage = new Product(page);
    await productPage.assertAllPageLocatorsVisible();
    const productItem = await productPage.getItem();
    await productItem.assertAllPageLocatorsVisible();
    await productItem.assertProductDataAccuracyInRow(product);
    await productItem.addToCartButton.click();
    await expect(productItem.addToCartButton).toBeHidden();
    await expect(productItem.removeButton).toBeVisible();
    
    expect(productPage.header.shoppingCartBadge).toHaveText('1');
    await productPage.header.shoppingCart.click();

    // cart page
    const cartPage = new Cart(page);
    const itemCart = await cartPage.itemByName(product.name);
    await itemCart.assertAllPageLocatorsVisible();
    await cartPage.checkoutButton.click();

    // checkout personal information
    const checkoutPersonal = new CheckoutPersonal(page);
    await checkoutPersonal.assertAllPageLocatorsVisible();
    await checkoutPersonal.fillPersonalInfo();
    await checkoutPersonal.continue.click();

    //checkout summary
    const checkoutSummary = new CheckoutSummary(page);
    await checkoutSummary.assertAllPageLocatorsVisible();
    const itemSummary = await checkoutSummary.getItemByName(product.name);
    await itemSummary.assertAllPageLocatorsVisible();

    await expect(checkoutSummary.itemTotalCost).toContainText(product.price.toString());
    await expect(checkoutSummary.taxCost).toContainText(product.tax.toString());
    await expect(checkoutSummary.totalCost).toContainText(product.totalAlone.toString());

    await checkoutSummary.finish.click();

    // finish
    const checkoutCompletePage = new CheckoutComplete(page);
    await checkoutCompletePage.assertAllPageLocatorsVisible();
    await checkoutCompletePage.backHomeButton.click();

    expect(page.url()).toContain(URLS.INVENTORY)
    await inventoryPage.assertAllPageLocatorsVisible();
    await expect(productPage.header.shoppingCartBadge).toBeHidden();
  });

  test('add to cart 1-6 range items from inventory and check if products matches product card', async ({page})=> {
    const inventory = new Inventory(page); 
    const addedItems = await inventory.addToCartItems({range: [1, 6]});
    const productView = new Product(page);
    for( const item of addedItems)
      await test.step(`Check product details for: ${await item.name.textContent()}`, async () => {
        const scrapped = await ParsedProduct.fromInventoryItem(item);
        await item.img.click();
        const productItem = await productView.getItem();
        await productItem.assertProductDataFromInventory(scrapped);
        await expect(productItem.removeButton).toBeVisible();
        await expect(productItem.removeButton).toBeEnabled();
        await productView.backToInventory.click();
        await expect(item.img).toBeVisible();
      })
  });

  test(
    `complete full checkout for '${products.bikeLight.name}, ${products.jacket.name}, ${products.backpack.name}`,
    async ({page}) => {
      const inventoryPage = new Inventory(page);
      await inventoryPage.assertAllPageLocatorsVisible();

      const productsList: ProductType[] = [products.bikeLight, products.jacket, products.backpack];
      const productNames: string[] = [products.bikeLight.name, products.jacket.name, products.backpack.name]
      await inventoryPage.addToCartItems({names: productNames});
      await new HeaderView(page).shoppingCart.click();

      // checkout 1
      const cart = new Cart(page);
      await cart.assertAllPageLocatorsVisible();
      const itemRowList: ItemView[] = await cart.getItemsList();
      
      for(let i = 0; i < itemRowList.length; i++){
        await itemRowList[i].assertProductDataAccuracyInRow(productsList[i]);
      }

      await cart.checkoutButton.click();
      
      // checkout 2
      const personalCheckout = new CheckoutPersonal(page);
      await personalCheckout.fillPersonalInfo();
      await personalCheckout.continue.click();

      // checkout summary
      const checkoutSummary = new CheckoutSummary(page);
      const summaryItemList: ItemView[] = await checkoutSummary.getItemsList(); 
      for(let i = 0; i < summaryItemList.length; i++){
        await summaryItemList[0].assertProductDataAccuracyInRow(productsList[0]);
      }
      const itemsCalculated = productsList.reduce((sum, product) => sum + product.price, 0);
      const itemsTaxCalculated = productsList.reduce((sum, product) => sum + product.tax, 0);
      expect(await checkoutSummary.itemTotalCost.textContent()).toContain("Item total: $" + itemsCalculated);
      expect(await checkoutSummary.taxCost.textContent()).toContain(itemsTaxCalculated.toFixed(2));
      expect(await checkoutSummary.totalCost.textContent()).toContain("Total: $" + (itemsCalculated+itemsTaxCalculated).toFixed(2));

  });

});
