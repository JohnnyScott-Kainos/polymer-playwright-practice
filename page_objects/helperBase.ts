import {Page, Locator, expect} from '@playwright/test'
import { clothingDetails } from '../testData/data'

export class HelperBase{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    /**
     * Wait for page to respond
     * @param timeInSeconds = Time in seconds - e.g. 1 = 1000ms
     */
    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    /**
     * Checks that the cart button is visible with the expected number of items 
     * @param expectedNumberInCartIcon - The number of items in the cart - i.e. what is expected to be seen beside the icon
     */
    async cartButtonShouldBeVisibleWithCorrectNumberOfItems(expectedNumberInCartIcon: number){
        const cartButton = this.page.getByLabel(`Shopping cart: ${expectedNumberInCartIcon} items`)
        await expect(cartButton).toBeVisible()
    }

    /**
     * check the url on the page is what it is exected to be
     * @param expectedUrl - The expected url enpoint - e.g. 'Men's Outerwear' expected url would be "/list/mens_outerwear"
     */
    async checkCorrectUrl(expectedUrlEnpoint: string){
        await expect(this.page).toHaveURL(expectedUrlEnpoint)
    }

}