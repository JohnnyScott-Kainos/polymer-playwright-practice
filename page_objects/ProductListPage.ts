import { Locator, Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class ProductListPage extends HelperBase {

    private readonly productList: Locator
    private readonly url: string
    private readonly productItemInList: Locator

    constructor(page: Page) {
        super(page)
        this.productList = page.locator('shop-list')
        this.productItemInList = page.locator('.grid li')
    }

    async navigateTo(){
        await this.page.goto(this.url)
    }

    /**
     * Click on an item in the list page
     * @param itemName - The name of the item you want to click exactly as it is on the page - e.g. "Men's Tech Shell Full-Zip"
     */
    async clickOnAnItem(itemName: string){
        await this.productList.getByRole('link', { name: itemName }).click();
    }

    /**
     * Check that the page returns the expected number of results
     * @param expectedCount - The number you expect there to be
     */
    async verifyCorrectNumberOfProducts(expectedCount: number){
        await this.page.waitForTimeout(2000);
        const count = await this.page.locator('.grid li').count();
        expect(count).toEqual(expectedCount)
    }

}