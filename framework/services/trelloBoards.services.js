import supertest from 'supertest';
import { urls } from '../config';
import querystring from 'querystring';
import {user} from '../config/user';
import {testBoard} from '../config/testData';

const TrelloBoards = function TrelloBoards() {
    this.createBoard = async function createBoard(apiKey, token, boardName) {
        const r = await supertest(urls.trello)
        .post('/1/boards/')
        .query({
            key: `${apiKey}`,
            token: `${token}`,
            name: `${boardName}`
        })
        .set('Accept', 'application/json');
        return r;
    };

    this.deleteBoard = async function deleteBoard(boardId, apiKey, token) {
        const r = await supertest(urls.trello)
            .delete(`/1/boards/${boardId}`)
            .query({
                key: `${apiKey}`,
                token: `${token}`,
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
            key: `${apiKey}`,
            token: `${token}`
        })
        .set('Accept', 'application/json');
        return r;
        //добавить ошибку если отправляется больше 10 запросов в batch
    };
    this.getBoardLists = async function getLists(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/lists`)
            .query({
                key: `${apiKey}`,
                token: `${token}`
            })
            .set('Accept', 'application/json');
        return r;
    };

    this.getBoardCards = async function getBoardCards(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/cards`)
            .query({
                key: `${apiKey}`,
                token: `${token}`
            })
            .set('Accept', 'application/json');
        return r;
    };

    this.updateBoard = async function updateBoard(
        idBoard, apiKey, token, name
    ) {
        const r = await supertest(urls.trello)
            .put(`/1/boards/${idBoard}?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json')
            .send(name);
        return r;
    };
};

export { TrelloBoards }