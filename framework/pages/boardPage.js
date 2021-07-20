import { BasePage } from './basePage';

class BoardPage extends BasePage {
    constructor(page) {
        super(page);
        this.currentBoardMenuButton = '.pw-menu-btn__text';

        this.taskListAddButton = '#pwTasksLists > div > div.pw-tasks__container > div > div.pw-tasks-list__new-list > div > div.pw-tasks-list__add-btn';
        this.taskListCreateButton = ':is(button:has-text("Add list"))';
        this.taskListTitleInput = '.pw-input__control';

        this.taskListNewCardTitleInput = '.pw-tasks-list-item__new-card-title-input';
        this.taskListNewCardCreateButton = ':is(button:has-text("Add card"))';
        this.taskListNewCardCancelButton = 'button.pw-tasks-list-item__new-card-btn-cancel';

    }
    async getBoardName() {
        await this.page.waitForSelector(this.currentBoardMenuButton);
        const boardName = await this.page.textContent(this.currentBoardMenuButton);
        return boardName;
    };

    async createList(taskListName) {
        await this.page.waitForSelector(this.taskListAddButton);
        await this.page.click(this.taskListAddButton);
        await this.page.fill(this.taskListTitleInput, taskListName);
        await this.page.click(this.taskListCreateButton);
    };

    async getTaskListName(taskListPosition) {
        const listTitle = await this.page.textContent(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__btn > div.pw-tasks-list-expansion-panel__btn-title > div`);
        return listTitle;
    };

    async createCard(taskListPosition, cardName) {
        await this.page.waitForSelector(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div.pw-tasks-list__items-add`);
        await this.page.click(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div.pw-tasks-list__items-add`);
        await this.page.fill(this.taskListNewCardTitleInput, cardName);
        await this.page.click(this.taskListNewCardCreateButton);
    };

    async cancelCreateAnotherCard() {
        await this.page.waitForSelector(this.taskListNewCardCancelButton);
        await this.page.click(this.taskListNewCardCancelButton);
    };

    async getCardName(taskListPosition, cardPosition) {
        const cardTitle = await this.page.textContent(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div:nth-child(${cardPosition}) > div.pw-tasks-list-item > div > div > div.pw-tasks-list-item__card-content--top > div.pw-tasks-list-item__card-title`);
        return cardTitle;
    };
}

export { BoardPage };
