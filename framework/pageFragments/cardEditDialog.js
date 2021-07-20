import { BasePage } from '../pages/basePage';

class CardEditDialogClass extends BasePage {
    constructor(page) {
        super(page);
        this.cardTitleTextArea = 'textarea.pw-dialog-edit-card__title-text';
        this.closeDialogButton = 'button.pw-dialog-edit-card__header-close-btn';
    }
    async openCardEditDialogFromList(taskListPosition, cardPosition) {
        await this.page.waitForSelector(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div:nth-child(${cardPosition}) > div.pw-tasks-list-item > div`);
        await this.page.click(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div:nth-child(${cardPosition}) > div.pw-tasks-list-item > div`);
    };

    async changeCardTitle(cardNewName) {
        await this.page.waitForSelector(this.cardTitleTextArea);
        await this.page.click(this.cardTitleTextArea);
        await this.page.fill(this.cardTitleTextArea, cardNewName);
    };

    async closeCardEditDialog() {
        await this.page.click(this.closeDialogButton);
    };
}

export { CardEditDialogClass }
