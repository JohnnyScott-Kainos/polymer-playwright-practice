import { test, expect, Page } from '@playwright/test'
import { PageManager } from '../page_objects/PageManager'
import { clothingDetails } from '../testData/data.ts';

// pm = page manager - Stores all page objects and their methods
// use pm.on<ObjectPageClass> to access it's methods
let pm: PageManager

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)
    pm.onPolymerHomePage().navigateTo()
})

// test.describe('Home Page', () => {

//     // Loop over each clothing type
//     for (const [clothingType, { expectedUrl }] of Object.entries(clothingDetails)) {
//         // check main button for clothing type goes to correct url
//         test(`'${clothingType} main section buttons should go to correct url'`, async ({ page }) => {
//             await pm.onPolymerHomePage().clickMainSectionProductTypeButton(clothingType + ' Shop Now')
//             await pm.onPolymerListPage().checkCorrectUrl(expectedUrl)
//             await page.goBack()

//         })

//         // check menu button for clothing type goes to correct url
//         test(`${clothingType} menu button should go to correct url`, async ({ page }) => {
//             await pm.onPolymerHomePage().clickMenuProductTypeButton(clothingType)
//             await pm.onPolymerListPage().waitForNumberOfSeconds(2)
//             await pm.onPolymerListPage().checkCorrectUrl(expectedUrl)
//             await page.screenshot({path: `screenshot/${clothingType}URL.png`})
//             await page.goBack()
//         })
//     }

//     test('cart button should be visible', async () => {
//         await pm.onPolymerHomePage().cartButtonShouldBeVisibleWithCorrectNumberOfItems(0)
//     })
// })

// test.describe('Cart Tests', () => {

//     test('item should be in the cart when added - 2 items, size Large', async () => {

//         const productCategory = "Men's Outerwear"
//         const itemName = clothingDetails[productCategory].products[0].name

//         // Go to mens outer wear and click on an item
//         await pm.onPolymerHomePage().clickMainSectionProductTypeButton(productCategory)
//         await pm.onPolymerListPage().clickOnAnItem(itemName)

//         // add item to the cart
//         await pm.onPolymerProductPage().selectItemSizeAndQuantity('L', '2')
//         await pm.onPolymerProductPage().addItemToCart()
//         await pm.onPolymerProductPage().cartButtonShouldBeVisibleWithCorrectNumberOfItems(2)

//         // Go to cart and check if item is there
//         await pm.onPolymerProductPage().waitForNumberOfSeconds(1)
//         await pm.onPolymerProductPage().clickViewCartButton()
//         await pm.onPolymerCartPage().correctItemShouldBeInCart(itemName)
//     })

//     test('cart should be empty after item added and deleted', async () => {

//         const productCategory = "Men's Outerwear"
//         const itemName = clothingDetails[productCategory].products[2].name
//         // Go to mens outer wear
//         await pm.onPolymerHomePage().clickMainSectionProductTypeButton(productCategory)

//         // add item to cart
//         await pm.onPolymerListPage().clickOnAnItem(itemName)
//         await pm.onPolymerProductPage().selectItemSizeAndQuantity('L', '2')
//         await pm.onPolymerProductPage().addItemToCart()

//         // check if item has added successfully
//         await pm.onPolymerProductPage().waitForNumberOfSeconds(2)
//         await pm.onPolymerProductPage().clickViewCartButton()
//         await pm.onPolymerCartPage().correctItemShouldBeInCart(itemName)

//         // Remove Item from cart
//         await pm.onPolymerCartPage().deleteItemFromCartButton(itemName)

//         // Check if cart is now empty
//         await pm.onPolymerCartPage().cartShouldBeEmpty()
//     })
// })

// test.describe('Product Listings', () => {

//     test('Check if correct item is returned in product page when clicked', async () => {
//         const productCategory = "Men's Outerwear"
//         const itemName = clothingDetails[productCategory].products[3].name

//         // Go to mens outer wear page
//         await pm.onPolymerHomePage().clickMainSectionProductTypeButton("Men's Outerwear")

//         // Select Item
//         await pm.onPolymerListPage().clickOnAnItem(itemName)

//         // check if correct item shows in product page
//         await pm.onPolymerListPage().waitForNumberOfSeconds(1)
//         await pm.onPolymerProductPage().checkIfProductIsCorrect(itemName)

//     })

//     test('Back button on item goes back to correct item list', async () => {
//         const productCategory = "Ladies Outerwear"
//         const itemName = clothingDetails[productCategory].products[2].name
//         const expectedUrl = clothingDetails[productCategory].expectedUrl

//         // go to mens outer wear annd click on an item
//         await pm.onPolymerHomePage().clickMainSectionProductTypeButton(productCategory)
//         await pm.onPolymerListPage().clickOnAnItem(itemName)

//         // Click on back button
//         await pm.onPolymerProductPage().waitForNumberOfSeconds(2)
//         await pm.onPolymerProductPage().goBackToProductList()

//         //Check if url is correct
//         await pm.onPolymerListPage().checkCorrectUrl(expectedUrl)

//     })

//     for (const [clothingType, { expectedUrl, expectedProductCount }] of Object.entries(clothingDetails)) {
//         test(`Should navigate to ${clothingType} and have correct number of items`, async ({ page }) => {
//             await pm.onPolymerHomePage().clickMenuProductTypeButton(clothingType)
//             await pm.onPolymerListPage().checkCorrectUrl(expectedUrl)
//             await pm.onPolymerListPage().checkCorrectNumberOfProducts(expectedProductCount)
//         })
//     }
// })


test('Testing Actions', async()=>{
    await pm.onPolymerHomePage().waitForNumberOfSeconds(2)
    await pm.onPolymerHomePage().checkCorrectUrl('https://shop.polymer-project.org/')
})
