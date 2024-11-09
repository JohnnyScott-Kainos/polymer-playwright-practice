import {Page, Locator, expect} from '@playwright/test'
import { clothingDetails } from '../testData/data'

export class HelperBase{

    readonly page: Page
    private readonly shopLogoButton: Locator
    private readonly cartButton: Locator


    constructor(page: Page){
        this.page = page
        this.shopLogoButton = page.getByLabel('SHOP Home')
    }

    /**
     * Wait for page to respond
     * @param timeInSeconds = Time in seconds - e.g. 1 = 1000ms
     */
    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

    /**
     * Clicks on the cart icon button
     * - Number of items must be declared as this dynamically changes based on items in cart
     * @param expectedNumberInCartIcon - Number of items that should be in the cart
     */
    async clickCartIconButton(expectedNumberInCartIcon: number){
        await this.page.getByLabel(`Shopping cart: ${expectedNumberInCartIcon} items`).click()
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
    async verifyCorrectUrl(expectedUrlEnpoint: string){
        await expect(this.page).toHaveURL(expectedUrlEnpoint)
    }

    async verifyShopLogoButtonIsVisible(){
        await expect(this.shopLogoButton).toBeVisible()
    }

    async clickShopLogoButton(){
        await this.shopLogoButton.click()
    }

    async verifyShopLogoButtonIsVisibleAndDirectsBackToHome(){
        await this.waitForNumberOfSeconds(1)

        // check shop logo button is visible and click it
        await this.verifyShopLogoButtonIsVisible()
        await this.clickShopLogoButton()
        await this.waitForNumberOfSeconds(1)
        
        //check button click redirected to home page
        await this.verifyCorrectUrl('/')
    }

}