import { test, expect, Page } from '@playwright/test'
import { PageManager } from '../page_objects/PageManager'
import { clothingDetails } from '../testData/data.ts';

// pm = page manager - Stores all page objects and their methods
// use pm.on<ObjectPageClass> to access it's methods
let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)
    pm.onHomePage().navigateTo()
})

test.describe('Home Page Tests', () => {

    // Loop over each clothing type
    for (const [clothingType, { expectedUrl }] of Object.entries(clothingDetails)) {
        // check main button for clothing type goes to correct url
        test(`'${clothingType} main section buttons should go to correct url'`, async ({ page }) => {
            await pm.onHomePage().clickMainSectionProductTypeButton(clothingType + ' Shop Now')
            await pm.onListPage().verifyCorrectUrl(expectedUrl)

        })

        // check menu button for clothing type goes to correct url
        test(`${clothingType} menu button should go to correct url`, async ({ page }) => {
            await pm.onHomePage().clickMenuProductTypeButton(clothingType)
            await pm.onListPage().waitForNumberOfSeconds(2)
            await pm.onListPage().verifyCorrectUrl(expectedUrl)
            await page.screenshot({ path: `screenshot/${clothingType}URL.png` })
        })
    }

    test('cart button should be visible', async () => {
        await pm.onHomePage().cartButtonShouldBeVisibleWithCorrectNumberOfItems(0)
    })

    test('shop Logo Button should be visible and stay on home page after clicked', async () => {
        // check shop logo button is visible and directs to home page correctly
        await pm.onHomePage().verifyShopLogoButtonIsVisibleAndDirectsBackToHome()

    })

})

test.describe('Cart Tests', () => {

    test('item should be in the cart when added - 2 items, size Large', async () => {

        const productCategory = "Men's Outerwear"
        const itemName = clothingDetails[productCategory].products[0].name

        // Go to mens outer wear and click on an item
        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)
        await pm.onListPage().clickOnAnItem(itemName)

        // add item to the cart
        await pm.onProductPage().selectItemSizeAndQuantity('L', '2')
        await pm.onProductPage().addItemToCart()
        await pm.onProductPage().cartButtonShouldBeVisibleWithCorrectNumberOfItems(2)

        // Go to cart and check if item is there
        await pm.onProductPage().waitForNumberOfSeconds(1)
        await pm.onProductPage().clickViewCartButton()
        await pm.onCartPage().correctItemShouldBeInCart(itemName)
    })

    test('cart should be empty after item added and deleted', async () => {

        const productCategory = "Men's Outerwear"
        const itemName = clothingDetails[productCategory].products[2].name
        // Go to mens outer wear
        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)

        // add item to cart
        await pm.onListPage().clickOnAnItem(itemName)
        await pm.onProductPage().selectItemSizeAndQuantity('L', '2')
        await pm.onProductPage().addItemToCart()

        // check if item has added successfully
        await pm.onProductPage().waitForNumberOfSeconds(2)
        await pm.onProductPage().clickViewCartButton()
        await pm.onCartPage().correctItemShouldBeInCart(itemName)

        // Remove Item from cart
        await pm.onCartPage().deleteItemFromCartButton(itemName)

        // Check if cart is now empty
        await pm.onCartPage().cartShouldBeEmpty()
    })

    test('shop Logo Button should be visible and direct to home page', async () => {
        // Go to Cart Page
        await pm.onHomePage().clickCartIconButton(0)

        // check shop logo button is visible and directs to home page correctly
        await pm.onHomePage().verifyShopLogoButtonIsVisibleAndDirectsBackToHome()

    })
})

test.describe('Product Listings', () => {

    test('Check if correct item is returned in product page when clicked', async () => {
        const productCategory = "Men's Outerwear"
        const itemName = clothingDetails[productCategory].products[3].name

        // Go to mens outer wear page
        await pm.onHomePage().clickMainSectionProductTypeButton("Men's Outerwear")

        // Select Item
        await pm.onListPage().clickOnAnItem(itemName)

        // check if correct item shows in product page
        await pm.onListPage().waitForNumberOfSeconds(1)
        await pm.onProductPage().verifyIfProductIsCorrect(itemName)

    })

    test('Back button on item goes back to correct item list', async () => {
        const productCategory = "Ladies Outerwear"

        // Data taken from data.ts file with details on products
        const itemName = clothingDetails[productCategory].products[2].name
        const expectedUrl = clothingDetails[productCategory].expectedUrl

        // go to mens outer wear annd click on an item
        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)
        await pm.onListPage().clickOnAnItem(itemName)

        // Click on back button
        await pm.onProductPage().waitForNumberOfSeconds(2)
        await pm.onProductPage().goBackToProductList()

        //Check if url is correct
        await pm.onListPage().verifyCorrectUrl(expectedUrl)

    })

    for (const [clothingType, { expectedUrl, expectedProductCount }] of Object.entries(clothingDetails)) {
        test(`Should navigate to ${clothingType} and have correct number of items`, async () => {
            await pm.onHomePage().clickMenuProductTypeButton(clothingType)
            await pm.onListPage().verifyCorrectUrl(expectedUrl)
            await pm.onListPage().verifyCorrectNumberOfProducts(expectedProductCount)
        })
    }

    test('shop Logo Button should be visible and direct to home page', async () => {

        // Define a product category to go to that listing page
        const productCategory = "Men's Outerwear"

        // Go to men's outwerwear
        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)

        // check shop logo button is visible and directs to home page correctly
        await pm.onListPage().verifyShopLogoButtonIsVisibleAndDirectsBackToHome()

    })
})

test.describe('Product Page Tests', () => {
    test('shop Logo Button should be visible and direct to home page', async () => {

        // Define which product category to go to and select an item in that category - stored in the data.ts file as a JSON object called 'clothingDetails'
        const productCategory = "Ladies Outerwear"
        const itemName = clothingDetails[productCategory].products[2].name

        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)
        await pm.onListPage().clickOnAnItem(itemName)

        // check shop logo button is visible and directs to home page correctly
        await pm.onHomePage().verifyShopLogoButtonIsVisibleAndDirectsBackToHome()

    })
})