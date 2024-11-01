import {Page, Locator, expect} from '@playwright/test'
import { HelperBase } from './helperBase'

export class Homepage extends HelperBase{

    private readonly url: string

    constructor(page:Page){
        super(page)
        this.url = '/'
    }

    async navigateTo(){
        await this.page.goto(this.url)
    }

    /**
     * Click on the product category button in the main section
     * @param productType - The name of the category - e.g. 'Men's Outerwear'
     */
    async clickMainSectionProductTypeButton(productType: string){
        const productButton = this.page.getByLabel(productType)
        await productButton.click()
    }

    /**
     * Click on the product category button in the top menu
     * @param productType - The name of the category - e.g. 'Men's Outerwear'
     */
    async clickMenuProductTypeButton(productType: string){
        const productMenuButton = this.page.locator('#tabContainer').getByRole('link', { name: productType })
        await productMenuButton.click()
    }

    async goToPreviousPage(){
        await this.page.goBack()
    }

}