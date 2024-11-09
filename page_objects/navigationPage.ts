import { Page } from "playwright/test";

export class NavigationPage{

    private readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async homePage(){
        await this.page.goto('/')
    }

    async cartPage(){
        await this.page.goto('/cart')
    }

}