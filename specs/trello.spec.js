import {afterAll, beforeAll, beforeEach, describe, expect, test} from '@jest/globals';
import { apiProvider } from '../framework/services/index';

import {user} from '../framework/config/user';
import {testData} from '../framework/config/testData';

let boardIdsAfter;
describe('Получение информации о пользователе', () => {
    let boardIdsBefore;

    beforeAll ( async () => {
        for (let boardName of testData.boardNames) {
            await  apiProvider().TrelloBoards().createBoard(user.apiKey, user.token, boardName)
        };
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        boardIdsBefore = r.body.boards.map((board) => board.id);

        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[0]
            );
        const listId = await apiProvider().TrelloBoards()
            .getListIdByIndex(boardId, user.apiKey, user.token, 0);

        for (let cardName of testData.cardNames) {
            await apiProvider().TrelloCards().createCard(user.apiKey, user.token, cardName, listId);
        }
    });
    afterAll(async () => {
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        boardIdsAfter = r.body.boards.map((board) => board.id);
        for (let boardId of boardIdsAfter) {
            await apiProvider().TrelloBoards().deleteBoard(boardId, user.apiKey, user.token);
        }
    });

    test('Получить id пользователя через токен', async () => {
        const r = await apiProvider().TrelloTokens().getTokenMember(user.apiKey, user.token);
        expect(r.status).toEqual(200);
        expect(r.body.id).toEqual(user.id);
    });
    test('Получить данные о пользователе', async () => {
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        expect(r.body.fullName).toEqual(user.fullName);
        expect((r.body.boards.map((board) => board.id))).toEqual(boardIdsBefore);
    });
    test('Получить данные о досках пользователя', async () => {
        const { body } = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        const boardIds = body.boards.map((board) => board.id);

        const dataFields = {
            boardStars: 'mine',
            customFields: 'true',
            fields: 'name,closed,shortLink,prefs,premiumFeatures,idOrganization,memberships,dateLastView',
            labels: 'all',
            lists: 'all',
            list_fields: 'all',
            members: 'all',
        };

        const r = await apiProvider().TrelloBoards().getBoardsData(dataFields, boardIds, user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    test('Получить листы доски', async () => {
        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[2]
            );

        const r = await apiProvider().TrelloBoards().getBoardLists(boardId, user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    test('Получить карточки доски', async () => {
        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[0]
            );

        const r = await apiProvider().TrelloBoards().getBoardCards(boardId, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        expect((r.body.map((card) => card.id).length)).toEqual(testData.cardNames.length);
    })
});

describe('Основной функционал', () => {
    let boardIdsBefore;
    beforeAll ( async () => {
        for (let boardName of testData.boardNames) {
            await  apiProvider().TrelloBoards().createBoard(user.apiKey, user.token, boardName)
        };

        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        boardIdsBefore = r.body.boards.map((board) => board.id);

        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[0]
            );

        const listId = await apiProvider().TrelloBoards().getListIdByIndex(boardId, user.apiKey, user.token, 0);

        for (let cardName of testData.cardNames) {
            await apiProvider().TrelloCards().createCard(user.apiKey, user.token, cardName, listId);
        }
    });

    afterAll(async () => {
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        boardIdsAfter = r.body.boards.map((board) => board.id);
        for (let boardId of boardIdsAfter) {
            await apiProvider().TrelloBoards().deleteBoard(boardId, user.apiKey, user.token);
        }
    });

    test('Переименовать доску', async () => {
        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[1]
            );
        const { status, body } = await apiProvider().TrelloBoards()
            .updateBoard(boardId, user.apiKey, user.token, { name: 'Test' });
        expect(status).toEqual(200);
        expect(body.name).toEqual('Test');
    });
    test('Создать карточку', async () => {
        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[2]
            );

        const listId = await apiProvider().TrelloBoards()
            .getListIdByIndex(boardId, user.apiKey, user.token, 0);

        const r = await apiProvider().TrelloCards()
            .createCard(user.apiKey, user.token, testData.cardNames[0], listId);
        expect(r.status).toEqual(200);
    });
    test('Добавить пользователя в карточку', async () => {
        const boardId = await apiProvider().TrelloMembers()
            .getMemberBoardIdByName(
                user.id, user.apiKey, user.token, testData.boardNames[0]
            );

        const { body } = await apiProvider().TrelloBoards().getBoardCards(boardId, user.apiKey, user.token);
        const cardId = body.map((card) => card.id)[0];

        const r = await apiProvider().TrelloCards().addMemberToCard(cardId, user.apiKey, user.token, user.id);
        expect(r.status).toEqual(200);
    });
});
