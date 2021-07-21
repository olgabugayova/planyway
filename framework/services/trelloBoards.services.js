import supertest from 'supertest';
import { urls } from '../config';
import querystring from 'querystring';
import {apiProvider} from './index';
import {user} from '../config/user';

const TrelloBoards = function TrelloBoards() {
    this.createBoard = async function createBoard(apiKey, token, boardName) {
        const r = await supertest(urls.trello)
        .post('/1/boards/')
        .query({
            key: apiKey,
            token: token,
            name: boardName
        })
        .set('Accept', 'application/json');
        return r;
    };
    this.deleteBoard = async function deleteBoard(boardId, apiKey, token) {
        const r = await supertest(urls.trello)
            .delete(`/1/boards/${boardId}`)
            .query({
                key: apiKey,
                token: token,
            })
            .set('Accept', 'application/json');
        return r;
    };
    this.getBoardsData = async function getBoardsInfo(dataFields, boardIds, apiKey, token) {
        const r = await supertest(urls.trello)
        .get('/1/batch/')
        .query({
            urls: boardIds.map(boardId => `/boards/${boardId}?${querystring.encode(dataFields)}`)
        })
        .query({
            key: apiKey,
            token: token
        })
        .set('Accept', 'application/json');
        return r;
    };
    this.getBoardLists = async function getLists(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/lists`)
            .query({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json');
        return r;
    };

    this.getListIdByIndex = async function getListIdByPIndex(idBoard, apiKey, token, index) {
        const { body } = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/lists`)
            .query({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json');

        const listId = body.map((list) => list.id)[index];
        return listId;
    };

    this.getBoardCards = async function getBoardCards(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/cards`)
            .query({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json');
        return r;
    };

    this.updateBoard = async function updateBoard(
        idBoard, apiKey, token, name
    ) {
        const r = await supertest(urls.trello)
            .put(`/1/boards/${idBoard}`)
            .query ({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json')
            .send(name);
        return r;
    };
};

export { TrelloBoards }