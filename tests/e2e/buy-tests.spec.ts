import { test, expect } from '@playwright/test';
import commonSteps from '../common-steps/common-steps';
import Inventory from '../../pages/inventory-page/inventory-page';
import Product from '../../pages/product-page/product-page';
import CheckoutPersonal from '../../pages/checkout-personal/checkout-personal';
import CheckoutSummary from '../../pages/checkout-summary/checkout-summary';
import { products } from '../data/data';
import CheckoutComplete from '../../pages/checkout-complete-page/checkout-complete-page';
import Cart from '../../pages/cart-page/cart-page';

test.describe('Buying tests', {tag: ['@buy-functionality']},() => {
  
  test.beforeEach(async ({ page }) => {
    await commonSteps.openPage(page, '/inventory.html');
  });

  test('user completes full checkout for one product and returns to inventory', {tag: ['@e2e','@buy-1-thingy']},async ({ page }) => {
    const product = products.bikeLight;

    // inventory page
    const inventoryPage = new Inventory(page);
    await inventoryPage.assertAllPageLocatorsVisible();
    const itemTitle = inventoryPage.itemByName(product.name);
    await itemTitle.click();
    expect(page.url()).toContain('inventory-item.html');

    // product page
    const productPage = new Product(page);
    await productPage.assertAllPageLocatorsVisible();
    await productPage.addToCartButton.click();
    await expect(productPage.addToCartButton).toBeHidden();
    await expect(productPage.removeButton).toBeVisible();
    
    expect(productPage.headerObject.shoppingCartBadge).toHaveText('1');
    await productPage.headerObject.shoppingCart.click();

    // cart page
    const cartPage = new Cart(page);
    const itemCart = await cartPage.itemByName(product.name);
    await itemCart.assertAllPageLocatorsVisible();
    await cartPage.checkoutButton.click();

    // checkout personal information
    const checkoutPersonal = new CheckoutPersonal(page);
    await checkoutPersonal.assertAllPageLocatorsVisible();
    await checkoutPersonal.fillCorrectData();
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

    expect(page.url()).toContain('inventory.html')
    await inventoryPage.assertAllPageLocatorsVisible();
    await expect(productPage.headerObject.shoppingCartBadge).toBeHidden();
  });

});
