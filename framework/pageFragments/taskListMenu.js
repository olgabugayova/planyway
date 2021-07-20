import { BasePage } from '../pages/basePage';

class TaskListMenuClass extends BasePage {
    constructor(page) {
        super(page);
        this.deleteButton = 'body > .md-open-menu-container >> .pw-menu-item-btn:has(div.pw-menu-item-btn__text:has-text("Delete"))';
    }
    async deleteList(listPosition) {
        await this.page.hover(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${listPosition}) > div.pw-tasks-list-expansion-panel__btn`);
        await this.page.click(`#pwTasksLists > div > div.pw-tasks__container > div > div:nth-child(${listPosition}) > div.pw-tasks-list-expansion-panel__btn > div.pw-tasks-list-expansion-panel__btn-actions > button`);
        await this.page.click(this.deleteButton);
    };

}

export { TaskListMenuClass }
