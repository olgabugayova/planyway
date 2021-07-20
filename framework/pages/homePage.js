import { BasePage } from './basePage';
import { testData } from '../config/testData';

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.accountButton = '.pw-home-sidebar__button-text:has-text("Account")';
        this.boardNameInput = 'body > .md-dialog-container >> .pw-dialog-board__title:has(input.pw-input__control)';
        this.boardNameInputActive = '.pw-input__control';
        this.boardsPanel = '.pw-board-picker';
        this.createBoardButton = '#pwBodyWrapper > pw-home > div > pw-board-picker > div > div.pw-board-picker__organizations > div:nth-child(1) > div.pw-board-picker__organization-boards > div > div.pw-board-picker__organization-board-name';
        this.saveNewBoardButton = 'body > .pw-js-dialog-primary-btn:has-text(" Create ")';
        this.testBoard = '#pwBodyWrapper > pw-home > div > pw-board-picker > div > div.pw-board-picker__organizations > div:nth-child(1) > div.pw-board-picker__organization-boards > a:nth-child(1) > div.pw-board-picker__organization-board-name';
    };
    async createBoard(boardName) {
        await this.page.waitForSelector(this.createBoardButton);
        await this.page.click(this.createBoardButton);
        await this.page.waitForSelector(this.boardNameInput);
        await this.page.click(this.boardNameInput);
        await this.page.fill(this.boardNameInputActive, boardName);
        await this.page.click(this.saveNewBoardButton);
    };

    async gotoBoard(boardId) {
        await this.page.waitForSelector(this.boardsPanel);
        await this.page.click(`a[href*="${boardId}"]`);
    };

    async getBoardName() {
        await this.page.waitForSelector(this.boardsPanel);
        const boardName = await this.page.textContent(this.testBoard);
        return boardName;
    };

    async getAccountText() {
      await this.page.waitForSelector(this.accountButton);
      const accountText = await this.page.textContent(this.accountButton);
      return accountText;
    };
}

export { HomePage };