import chai from 'chai';
import { goto, runWithAuth, stop } from '../framework/lib/browser';
import { application } from '../framework/pages';
import {testData} from '../framework/config/testData';
import {apiProvider} from '../framework/services';
import {user} from '../framework/config/user';

const { expect } = chai;
let page;
let app;
let boardId;
let boardIds;

describe('Переход к доске, создание тасклиста, создание и редактирование карточки', () => {
    beforeEach(async () => {
        await runWithAuth();
        page = await goto('https://planyway.com/app');
        app = application(page);

        await apiProvider().TrelloBoards().createBoard(user.apiKey, user.token, testData.boardNames[0]);
        boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[0]
            );
    });
    afterEach(async () => {
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        boardIds = r.body.boards.map((board) => board.id);
        boardIds.forEach((boardId) => {
            apiProvider().TrelloBoards().deleteBoard(boardId, user.apiKey, user.token);
        });
        await stop();
    });

    it('Пользователь может перейти в доску с Home page', async () => {
        await app.HomePage().gotoBoard(boardId);
        const boardName = await app.BoardPage().getBoardName();
        expect(boardName).to.have.string(testData.boardNames[0]);
    });

    it('Пользователь может создать тасклист', async () => {
        await app.HomePage().gotoBoard(boardId);
        await app.BoardPage().createList('Test list');
        const listTitle = await app.BoardPage().getTaskListName(4);
        expect(listTitle).to.have.string('Test list');

        await app.TaskListMenu().deleteList(4);
        await app.ConfirmationDialog().deleteConfirmation();
    });

    it('Пользователь может создать карточку в тасклисте', async () => {
        await app.HomePage().gotoBoard(boardId);
        await app.BoardPage().createCard(1, 'Test card');
        await app.BoardPage().cancelCreateAnotherCard();
        const cardTitle = await app.BoardPage().getCardName(1, 1);
        expect(cardTitle).to.have.string('Test card');

        await app.CardMenu().deleteCard(1, 1);
        await app.ConfirmationDialog().deleteConfirmation();
    });

    it('Пользователь может создать карточку в тасклисте и отредактировать название', async () => {
        await app.HomePage().gotoBoard(boardId);
        await app.BoardPage().createCard(1, 'Test card');
        await app.BoardPage().cancelCreateAnotherCard();
        await app.CardEditDialog().openCardEditDialogFromList(1, 1);
        await app.CardEditDialog().changeCardTitle('New card name')
        await app.CardEditDialog().closeCardEditDialog();

        const newCardTitle = await app.BoardPage().getCardName(1, 1);
        expect(newCardTitle).to.have.string('New card name');

        await app.CardMenu().deleteCard(1, 1);
        await app.ConfirmationDialog().deleteConfirmation();
    });
});
