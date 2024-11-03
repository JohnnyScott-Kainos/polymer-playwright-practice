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

test.describe('Home Page', () => {

    // Loop over each clothing type
    for (const [clothingType, { expectedUrl }] of Object.entries(clothingDetails)) {
        // check main button for clothing type goes to correct url
        test(`'${clothingType} main section buttons should go to correct url'`, async ({ page }) => {
            await pm.onHomePage().clickMainSectionProductTypeButton(clothingType + ' Shop Now')
            await pm.onListPage().checkCorrectUrl(expectedUrl)
            await page.goBack()

        })

        // check menu button for clothing type goes to correct url
        test(`${clothingType} menu button should go to correct url`, async ({ page }) => {
            await pm.onHomePage().clickMenuProductTypeButton(clothingType)
            await pm.onListPage().waitForNumberOfSeconds(2)
            await pm.onListPage().checkCorrectUrl(expectedUrl)
            await page.screenshot({ path: `screenshot/${clothingType}URL.png` })
            await page.goBack()
        })
    }

    test('cart button should be visible', async () => {
        await pm.onHomePage().cartButtonShouldBeVisibleWithCorrectNumberOfItems(0)
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

    test('Shop Logo Button should be visible and direct to home page', async () => {
        // Go to Cart Page
        await pm.onHomePage().clickCartIconButton(0)
        await pm.onCartPage().waitForNumberOfSeconds(1)

        // check shop logo button is visible and click it
        await pm.onCartPage().checkShopLogoButtonIsVisible()
        await pm.onCartPage().clickShopLogoButton()
        await pm.onCartPage().waitForNumberOfSeconds(1)
        
        //check button click redirected to home page
        await pm.onCartPage().checkCorrectUrl('/')
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
        await pm.onProductPage().checkIfProductIsCorrect(itemName)

    })

    test('Back button on item goes back to correct item list', async () => {
        const productCategory = "Ladies Outerwear"
        const itemName = clothingDetails[productCategory].products[2].name
        const expectedUrl = clothingDetails[productCategory].expectedUrl

        // go to mens outer wear annd click on an item
        await pm.onHomePage().clickMainSectionProductTypeButton(productCategory)
        await pm.onListPage().clickOnAnItem(itemName)

        // Click on back button
        await pm.onProductPage().waitForNumberOfSeconds(2)
        await pm.onProductPage().goBackToProductList()

        //Check if url is correct
        await pm.onListPage().checkCorrectUrl(expectedUrl)

    })

    for (const [clothingType, { expectedUrl, expectedProductCount }] of Object.entries(clothingDetails)) {
        test(`Should navigate to ${clothingType} and have correct number of items`, async ({ page }) => {
            await pm.onHomePage().clickMenuProductTypeButton(clothingType)
            await pm.onListPage().checkCorrectUrl(expectedUrl)
            await pm.onListPage().checkCorrectNumberOfProducts(expectedProductCount)
        })
    }
})


test('Testing Actions', async () => {
    await pm.onHomePage().waitForNumberOfSeconds(2)
    await pm.onHomePage().checkCorrectUrl('https://shop.polymer-project.org/')
})
