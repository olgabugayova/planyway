import supertest from 'supertest';
import { urls } from '../config';
import {user} from '../config/user';

const TrelloCards = function TrelloCards() {
    this.getCards = async function getCards(idList, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/lists/${idList}/cards?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };
    this.createCard = async function createCard(apiKey, token, idList, name) {
        const r = await supertest(urls.trello)
            .post(`/1/cards?key=${apiKey}&token=${token}&idList=${idList}`)
            .set('Accept', 'application/json')
            .send(name);
        return r;
    };
    this.deleteCard = async function deleteCard(idCard, apiKey, token) {
        const r = await supertest(urls.trello)
            .delete(`/1/cards/${idCard}?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getCurrentCardsNumberInList = async function getCurrentCardsNumberInList(idList, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/lists/${idList}/cards?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');

        const currentCardsNumber = r.body
            .map((cards) => cards.id).length;
        return currentCardsNumber;
    };

    this.getFirstCardIdInList = async function getFirstCardIdInList(
        idList, apiKey, token
    ) {
        const r = await supertest(urls.trello)
            .get(`/1/lists/${idList}/cards?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');

        const idFirstCard = r.body
            .map((card) => card.id)[0];
        return idFirstCard;

    };

    this.addMemberToCard = async function addMemberToCard(
        idCard, idMember, apiKey, token
    ) {
        const r = await supertest(urls.trello)
            .post(`/1/cards/${idCard}/idMembers?key=${apiKey}&token=${token}&value=${idMember}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.removeMemberFromCard = async function addMemberToCard (
        idCard, idMember, apiKey, token
    ) {
        const r = await supertest(urls.trello)
            .delete(`/1/cards/${idCard}/idMembers/${idMember}?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.getMembersOfCard = async function getMembersOfCard (
        idCard, apiKey, token
    ) {
        const r = await supertest(urls.trello)
            .get(`/1/cards/${idCard}/members?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };

    this.checkMemberInCard = async function checkMemberInCard (
        idCard, apiKey, token, idMember) {
        const r = await new TrelloCards()
            .getMembersOfCard(idCard, apiKey, token);
        // const r = await supertest(urls.trello)
        //     .get(`/1/cards/${idCard}/members?key=${apiKey}&token=${token}`)
        //     .set('Accept', 'application/json');

        const memberAdded = r.body
            .filter((member) => member.id === idMember)
            .map((member) => member.id)[0];
        return memberAdded;
    };
};

export { TrelloCards }
