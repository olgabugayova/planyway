import supertest from 'supertest';
import { urls } from '../config';
import {user} from '../config/user';
import {TrelloBoards} from './trelloBoards.services';
import {testBoard} from '../config/boards';

const TrelloLists = function TrelloLists() {


    this.getLists = async function getLists(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/lists?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getIdLIstByName = async function getIdListByName(idBoard, apiKey, token, listName) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/lists?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');

        const idList = r.body
            .filter((list) => list.name === listName)
            .map((list) => list.id)[0];
        return idList;
    };

};

export { TrelloLists }