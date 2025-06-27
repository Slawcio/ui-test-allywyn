import { Product } from "../../types"

export const TEST_DATA = {
    
}

export const USER_DATA = {
    NAME: {
        STANDARD: 'standard_user',
        LOCKED_OUT: 'locked_out_user',
        PROBLEM: 'problem_user',
        PERFORMANCE_GLITCH: 'performance_glitch_user',
        ERROR: 'error_user',
        VISUAL: 'visual_user',
    },
    PASSWORD: 'secret_sauce'
}


export const PRODUCT: Record<string, Product> = {
    BIKE_LIGHT: {
        NAME: "Sauce Labs Bike Light",
        DESC: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
        PRICE: 9.99,
        TAX: 0.8,
        TOTAL_ALONE: 10.79
    },
    BACKPACK: {
        NAME: "Sauce Labs Backpack",
        DESC: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
        PRICE: 29.99,
        TAX: 2.40,
        TOTAL_ALONE: 32.39
    }
}