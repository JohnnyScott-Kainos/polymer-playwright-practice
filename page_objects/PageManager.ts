import {Page} from '@playwright/test'
import { CartPage } from './CartPage'
import { Homepage } from './HomePage'
import { ProductPage } from './ProductPage'
import { ProductListPage } from './ProductListPage'
import { CheckoutPage } from './CheckoutPage'

export class PageManager{

    private readonly page: Page
    private readonly cartPage: CartPage
    private readonly homePage: Homepage
    private readonly productPage: ProductPage
    private readonly productListPage: ProductListPage
    private readonly checkoutPage: CheckoutPage

    constructor(page: Page){
        this.page = page
        this.cartPage = new CartPage(page)
        this.homePage = new Homepage(page)
        this.productPage = new ProductPage(page)
        this.productListPage = new ProductListPage(page)
        this.checkoutPage = new CheckoutPage(page)
    }

    onPolymerCartPage(){
        return this.cartPage
    }

    onPolymerHomePage(){
        return this.homePage
    }

    onPolymerProductPage(){
        return this.productPage
    }

    onPolymerListPage(){
        return this.productListPage
    }

    onPolymerCheckoutPage(){
        return this.checkoutPage
    }

}