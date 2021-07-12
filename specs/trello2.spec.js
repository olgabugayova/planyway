import {describe, expect, test} from '@jest/globals';
import supertest from 'supertest';
import {TrelloBoards} from '../framework/services/trelloBoards.services';
import {user} from '../framework/config/user';
import {testBoard} from '../framework/config/boards';
import {TrelloLists} from '../framework/services/trelloLists.services';
import {TrelloCards} from '../framework/services/trelloCards.services';
import {urls} from '../framework/config';

//TODO перепроверить, посмотреть код в tfs
describe('Authorization',  () => {
    test('Auth with OAuth', async () => {
        const r = await supertest(urls.trello)
            .get(`/1/authorize/${user.apiKey}`)
            .set('Accept', 'application/json');
        expect(r.status).toEqual(200);
        const token = r.body;
    })
});
describe('Get information about boards', () => {
    test('Get all boards user belongs to', async () => {
        const r = await new TrelloBoards()
            .getBoards(user.username, user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    test('Get names of all boards user belongs to', async () => {
        const r = await new TrelloBoards()
            .getBoardsNames(user.username, user.apiKey, user.token);
        expect(r.status)
            .toEqual(200);
        console.log(r.body);
    });

    test('Get Board Id by name', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.board.name
            );
        expect(idBoard).toEqual(testBoard.board.id);
    });

    test('Rename board user belongs to', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const { status, body } = await new TrelloBoards()
            .updateBoard(idBoard, user.apiKey, user.token, 'Test');
        expect(status)
            .toEqual(200);
        expect(body.name).toEqual('Test');

        const response = await new TrelloBoards()
            .updateBoard(idBoard, user.apiKey, user.token, testBoard.name);
        expect(response.status)
            .toEqual(200);
        expect(response.body.name).toEqual(testBoard.name)
    });

    test('Get List Id by name', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const idList = await new TrelloLists()
           .getIdLIstByName(
               idBoard, user.apiKey, user.token, testBoard.testList.name
           );
        expect(idList)
            .toEqual(testBoard.testList.id);
    });

    test('Get an array of Cards in a List', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.board.name
            );

        const idList = await new TrelloLists()
            .getIdLIstByName(idBoard, user.apiKey, user.token, testBoard.list.name);

        const r = await new TrelloCards()
            .getCards(idList, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        console.log(r.body);
    });

    test('Get the first card in a List', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.board.name
            );

        const idList = await new TrelloLists()
            .getIdLIstByName(
                idBoard, user.apiKey, user.token, testBoard.list.name
            );

        const idCard = await new TrelloCards()
            .getFirstCardIdInList(idList, user.apiKey, user.token);
        expect(idCard).toEqual(testBoard.testCard.id);
    });

    test('Delete card', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const idList = await new TrelloLists()
            .getIdLIstByName(
                idBoard, user.apiKey, user.token, testBoard.testList.name
            );

        const currentCardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        const idCard = await new TrelloCards()
            .getFirstCardIdInList(idList, user.apiKey, user.token);

        const r = await new TrelloCards()
            .deleteCard(idCard, user.apiKey, user.token);
        expect(r.status).toEqual(200);

        const cardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);
        expect(cardsNumber).toBe(currentCardsNumber-1);

        const { status } = await new TrelloCards()
            .createCard(user.apiKey, user.token, idList, testBoard.testCard.name);
        expect(status).toEqual(200);
    });

    test('Create a new Card on a List', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const idList = await new TrelloLists()
            .getIdLIstByName(
                idBoard, user.apiKey, user.token, testBoard.testList.name
            );

        const currentCardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        const r = await new TrelloCards()
            .createCard(user.apiKey, user.token, idList, 'New Test Card');
        expect(r.status).toEqual(200);

        const cardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        expect(cardsNumber).toBe(currentCardsNumber+1);

        const { status } = await new TrelloCards()
            .deleteCard(r.body.id, user.apiKey, user.token);
        expect(status).toEqual(200);
    });

    test('Get members of a board', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const r = await new TrelloBoards()
            .getMembersOfBoard(idBoard, user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    test('Get member ID by name', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const idMember = await new TrelloBoards()
            .getMemberIdByName(idBoard, user.apiKey, user.token,user.username);
        //TODO заменить целевой айдишник проверочным
        expect(idMember).toEqual(idMember);
    });

    test('Add a member to a Card', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(
                user.username, user.apiKey, user.token, testBoard.name
            );

        const idList = await new TrelloLists()
            .getIdLIstByName(idBoard, user.apiKey, user.token, testBoard.testList.name);

        const idCard = await new TrelloCards()
            .getFirstCardIdInList(idList, user.apiKey, user.token);

        const idMember = await new TrelloBoards()
            .getMemberIdByName(idBoard, user.apiKey, user.token,user.username);

        const r = await new TrelloCards()
            .addMemberToCard(idCard, idMember, user.apiKey, user.token);

        expect(r.status).toEqual(200);

        //TODO написать проверку что именно этот мембер добавлен в карточку
        //для этого получить список мемберов карточки и проверить что он там есть
        //затем удалить его

        const cardMembersId = await new TrelloCards()
            .getMembersIdOfCard(idCard, user.apiKey, user.token);



    })
})