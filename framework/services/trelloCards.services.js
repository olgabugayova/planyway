import supertest from 'supertest';
import { urls } from '../config';

const TrelloCards = function TrelloCards() {
    this.createCard = async function createCard(apiKey, token, name, idList) {
        const r = await supertest(urls.trello)
            .post('/1/cards')
            .query({
                key: apiKey,
                token: token,
                name: name,
                idList: idList,
            })
            .set('Accept', 'application/json');

        return r;
    };

    this.addMemberToCard = async function addMemberToCard(
        idCard, apiKey, token, idMember
    ) {
        const r = await supertest(urls.trello)
            .post(`/1/cards/${idCard}/idMembers`)
            .query({
                key: apiKey,
                token: token,
                value: idMember,
            })
            .set('Accept', 'application/json');
        return r;
    };
};

export { TrelloCards }
