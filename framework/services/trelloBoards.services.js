import supertest from 'supertest';
import { urls } from '../config';
import {user} from '../config/user';
import {testBoard} from '../config/boards';

const TrelloBoards = function TrelloBoards() {
    this.getBoards = async function getBoards(username, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${username}/boards?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getSpecificBoard = async function getSpecificBoard(idBoard, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getBoardsNames = async function getBoardsNames(username, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${username}/boards?fields=name,url&key=${apiKey}&token=${token}`)
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

    this.getIdBoardByName = async function getIdBoardByName(username, apiKey, token, boardName) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${username}/boards?fields=name,url&key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');

        const idBoard = r.body
            .filter((board) => board.name === boardName)
            .map((board) => board.id)[0];
        return idBoard;
    };

    this.getMembersOfBoard = async function getMembersOfBoard(
        idBoard, apiKey, token
    ) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/members?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getMemberIdByName = async function getMemberIdByName(
        idBoard, apiKey, token, username
    ) {
        const r = await supertest(urls.trello)
            .get(`/1/boards/${idBoard}/members?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');

        const idMember = r.body
            .filter((member) => member.username === username)
            .map((member) => member.id)[0];
        return idMember;
    }
};

export { TrelloBoards }