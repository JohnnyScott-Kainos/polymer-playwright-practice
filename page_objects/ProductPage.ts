import {Locator, Page, expect} from '@playwright/test'
import { HelperBase } from './helperBase'

export class ProductPage extends HelperBase{

    private readonly chooseSizePicker: Locator
    private readonly chooseQuantity: Locator
    private readonly addToCartButton: Locator
    private readonly viewCartButton: Locator
    private readonly backButton: Locator

    constructor(page: Page){
        super(page)
        this.chooseSizePicker = page.getByLabel('Size')
        this.chooseQuantity = page.getByLabel('Quantity')
        this.addToCartButton = page.getByLabel('Add this item to cart')
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' })
        this.backButton = page.getByLabel('Go back')
    }

    async addItemToCart(){
        await this.addToCartButton.click()
    }

    async selectItemSizeAndQuantity(size: string, quantity: string){
        await this.chooseSizePicker.selectOption({value: size})
        await this.chooseQuantity.selectOption({value: quantity})
    }

    async clickAddToCartButton(){
        await this.addToCartButton.click()
    }

    async clickViewCartButton(){
        await this.viewCartButton.click()
    }

    /**
     * 
     * @param name 
     */
    async verifyIfProductIsCorrect(name: string){
        const itemTitle = this.page.getByRole('heading', { name: name })
        await expect(itemTitle).toBeVisible()
    }

    async goBackToProductList(){
        await this.backButton.click()
    }

    /**
     * 
     * @param expectedTitle 
     */
    async verifyItemTitleIsCorrect(expectedTitle: string){
        const title = this.page.getByRole('heading', { name: expectedTitle })
        await expect(title).toBeVisible()
    }

}