import {describe, expect, test} from '@jest/globals';
import supertest from 'supertest';
import {TrelloBoards} from '../framework/services/trelloBoards.services';
import {user} from '../framework/config/user';
import {testBoard} from '../framework/config/boards';
import {TrelloLists} from '../framework/services/trelloLists.services';
import {TrelloCards} from '../framework/services/trelloCards.services';

describe('Get information about boards', () => {
    test('Get all boards user belongs to', async () => {
        const r = await new TrelloBoards()
            .getBoards(user.username, user.apiKey, user.token);
        expect(r.status).toEqual(200);
    });

    // test('Get specific board', async () => {
    //     const r = await new TrelloBoards()
    //         .getSpecificBoard(boards.testBoard.idBoard, user.apiKey, user.token);
    //     expect(r.status)
    //         .toEqual(200);
    //     expect(r.body.name)
    //         .toBe('Software Development [Web App, iOS App, Android App]');
    // });

    test('Get names of all boards user belongs to', async () => {
        const r = await new TrelloBoards()
            .getBoardsNames(user.username, user.apiKey, user.token);
        expect(r.status)
            .toEqual(200);

        const idBoard = r.body
            .filter((board) => board.name === testBoard.currentName.name)
            .map((board) => board.id)[0];

        const { status, body } = await new TrelloBoards()
            .updateBoard(idBoard, user.apiKey, user.token, testBoard.newName);
        expect(status)
            .toEqual(200);
        expect(body.name).toEqual(testBoard.newName.name);
        console.log(body);

        const response = await new TrelloBoards()
            .updateBoard(idBoard, user.apiKey, user.token, testBoard.currentName);
        expect(response.status)
            .toEqual(200);
        expect(response.body.name).toEqual(testBoard.currentName.name)
        console.log(response.body);
    });

    test('Get an array of Cards on the List', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(user.username, user.apiKey, user.token, testBoard.currentName.name);
        // const idBoard = (await new TrelloBoards()
        //     .getBoardsNames(user.username, user.apiKey, user.token))
        //     .body
        //     .filter((board) => board.name === testBoard.currentName.name)
        //     .map((board) => board.id)[0];

        const idList = await new TrelloLists()
            .getIdLIstByName(
                idBoard, user.apiKey, user.token, testBoard.listName.name);
        // const idList = (await new TrelloBoards()
        //     .getLists(idBoard, user.apiKey, user.token))
        //     .body
        //     .filter((list) => list.name === testBoard.listName.name)
        //     .map((list) => list.id)[0];

        // expect(idList).toEqual('6088cf0d4f464b4e3bee9f3c');

        const r = await new TrelloLists()
            .getCards(idList, user.apiKey, user.token);
        expect(r.status).toEqual(200);
        console.log(r.body);
    });

    test('Create a new Card on a List', async () => {
        const idBoard = await new TrelloBoards()
            .getIdBoardByName(user.username, user.apiKey, user.token, testBoard.currentName.name);

        const idList = await new TrelloLists()
            .getIdLIstByName(idBoard, user.apiKey, user.token, testBoard.listName.name);

        const currentCardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        // const idBoard = (await new TrelloBoards()
        //     .getBoardsNames(user.username, user.apiKey, user.token))
        //     .body
        //     .filter((board) => board.name === testBoard.currentName.name)
        //     .map((board) => board.id)[0];

      // const idList = (await new TrelloBoards()
        //     .getLists(idBoard, user.apiKey, user.token))
        //     .body
        //     .filter((list) => list.name === testBoard.listName.name)
        //     .map((list) => list.id)[0];

        // const currentCardsNumber = (await new TrelloLists()
        //     .getCards(idList, user.apiKey, user.token))
        //     .body
        //     .map((cards) => cards.id).length;

        const r = await new TrelloCards()
            .createCard(user.apiKey, user.token, idList, testBoard.cardName);
        expect(r.status).toEqual(200);

        const cardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        expect(cardsNumber).toBe(currentCardsNumber+1);

        // const cardsNumber = (await new TrelloLists()
        //     .getCards(idList, user.apiKey, user.token))
        //     .body
        //     .map((cards) => cards.id).length;

        const { status } = await new TrelloCards()
            .deleteCard(r.body.id, user.apiKey, user.token);
        expect(status).toEqual(200);

        const afterCardsNumber = await new TrelloCards()
            .getCurrentCardsNumberInList(idList, user.apiKey, user.token);

        // const afterCardsNumber = (await new TrelloLists()
        //     .getCards(idList, user.apiKey, user.token))
        //     .body
        //     .map((cards) => cards.id).length;

        expect(afterCardsNumber).toBe(cardsNumber-1);

    });

     test('Add a member to a Card', async () => {

     })
})