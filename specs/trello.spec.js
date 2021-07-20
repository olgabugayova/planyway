import {afterAll, beforeAll, describe, expect, test} from '@jest/globals';
import { apiProvider } from '../framework/services/index';

import {user} from '../framework/config/user';
import {boardNames, testBoard} from '../framework/config/boards';
import {TrelloLists} from '../framework/services/trelloLists.services';
import {TrelloCards} from '../framework/services/trelloCards.services';

describe('Получение информации о пользователе при авторизации', () => {
    beforeAll (async () => {
        boardNames.forEach(async (boardName) => {
            await apiProvider().TrelloBoards().createBoard(user.apiKey, user.token, boardName)
        });

        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        const boardsIds = r.body.boards.map((board) => board.id);
        console.log(boardsIds);

    });

    test.only('Получение данных о токене', async () => {
        const r = await apiProvider().TrelloTokens().getToken(user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    test.skip('Получение данных о пользователе', async () => {
        const r = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        expect(r.body.fullName).toEqual(user.fullName);
        expect((r.body.boards.map((board) => board.id)).includes(testBoard.id)).toBeTruthy();
    });

    test.skip('Получение данных о досках пользователя', async () => {
        //айдишники передавать из тестовых данных
        const { body } = await apiProvider().TrelloMembers().getMember(user.id, user.apiKey, user.token);
        const boardIds = body.boards.map((board) => board.id);
        boardIds.length = 10;
        //разбить по 10 штук и отправлять запросы на каждую группу
        const dataFields = {
            boardStars: 'mine',
            customFields: 'true',
            fields: 'name,closed,shortLink,prefs,premiumFeatures,idOrganization,memberships,dateLastView',
            labels: 'all',
            lists: 'open',
            members: 'all',
        };

        const r = await apiProvider().TrelloBoards().getBoardsData(dataFields, boardIds, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        console.log(r.body);
    })

});

