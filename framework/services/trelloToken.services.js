import supertest from 'supertest';
import { urls } from '../config';

const TrelloTokens = function TrelloTokens() {

    this.getToken = async function getToken(apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/tokens/${token}?key=${apiKey}&token=${token}`)
            .set('Accept', 'application/json');
        return r;
    };
};

export { TrelloTokens }
