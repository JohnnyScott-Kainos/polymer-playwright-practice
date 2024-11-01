import {expect, Locator, Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class CartPage extends HelperBase{

    private readonly checkoutButton: Locator
    private readonly shopCartItem: Locator
    private readonly url: string
    private readonly emptyCartMessage: Locator

    constructor(page: Page){
        super(page)
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' })
        this.shopCartItem = page.locator('shop-cart-item')
        this.url = '/cart'
        this.emptyCartMessage = page.getByText('Your is empty.')
    }

    async navigateTo(){
        await this.page.goto(this.url)
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click()
    }

    /**
     * Method to delete item from the cart
     * @param name - name of the item to be deleted
     */
    async deleteItemFromCartButton(name: string){
        await this.page.getByLabel(`Delete Item ${name}`).click()
    }

    /**
     * Check if correct item is in the cart
     * @param name - Name of the item that is expected to be in the cart
     */
    async correctItemShouldBeInCart(name: string){
        const itemName = this.shopCartItem.getByText(name)
        await expect(itemName).toBeVisible()
    }

    async cartShouldBeEmpty(){
        await expect(this.emptyCartMessage).toBeVisible()
    }

}