import { BasePage } from '../pages/basePage';

class ConfirmationDialogClass extends BasePage {
    constructor(page) {
        super(page);
        this.deleteButton = 'body > .md-dialog-container >> .pw-dialog-footer__btn:has-text("Delete")';
        this.cancelButton = 'body > .md-dialog-container >> .pw-dialog-footer__btn:has-text("Cancel")'
    }
    async deleteConfirmation() {
        await this.page.waitForSelector(this.deleteButton);
        await this.page.click(this.deleteButton);
    };
    async deleteCancel() {
        await this.page.waitForSelector(this.cancelButton);
        await this.page.click(this.cancelButton);
    };
}

export { ConfirmationDialogClass }
