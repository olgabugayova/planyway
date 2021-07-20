import { BasePage } from '../pages/basePage';

class CardMenuClass extends BasePage {
    constructor(page) {
        super(page);
        this.deleteButton = 'body > .md-open-menu-container >> .pw-menu-item-btn:has(div.pw-menu-item-btn__text:has-text("Delete"))';
    }
    async deleteCard(taskListPosition, cardPosition) {
        await this.page.hover(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div.pw-tasks-list__item.pw-js-task-list-item > div.pw-tasks-list-item > div.pw-tasks-list-item__card`);
        await this.page.click(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${taskListPosition}) > div.pw-tasks-list-expansion-panel__content > div > div:nth-child(${cardPosition}) > div.pw-tasks-list-item > div > div > div.pw-tasks-list-item__card-content--top > div.pw-tasks-list-item__card-icons > div > div.pw-tasks-list-item__card-extra-actions-wrapper > button`);
        await this.page.click(this.deleteButton);
    };

}

export { CardMenuClass }
