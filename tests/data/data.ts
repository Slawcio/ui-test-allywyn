import { Product } from "../../types"

export const URLS = {
  INVENTORY: '/inventory.html',
  PRODUCT: '/inventory-item.html',
  CART: '/cart.html',
  CHECKOUT_PERSONAL: '/checkout-step-one.html',
  CHECKOUT_SUMMARY: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
  ABOUT: 'https://saucelabs.com/'
};

export const errorText = {

}

export const loginTestData = {
  name: {
    standard: 'standard_user',
    lockedOut: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
    error: 'error_user',
    visual: 'visual_user',
  },
  password: 'secret_sauce',
};

export enum LoginOutcome {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    LOCKED = 'LOCKED',
    USERNAME_REQ = 'USERNAME_REQUIRED',
    PASSWORD_REQ = 'PASSWORD_REQUIRED'
}

export const products: Record<string, Product> = {
    bikeLight: {
        name: "Sauce Labs Bike Light",
        desc: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        price: 9.99,
        tax: 0.8,
        totalAlone: 10.79
    },
    backpack: {
        name: "Sauce Labs Backpack",
        desc: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
        price: 29.99,
        tax: 2.40,
        totalAlone: 32.39
    }
    //... more to be added if necessary
}