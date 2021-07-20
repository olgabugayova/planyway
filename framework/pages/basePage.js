class BasePage {
    constructor(page) {
        this.page = page;
    }

    async url() {
        return await this.page.url();
    }

}

export { BasePage };

