import supertest from 'supertest';
import { urls } from '../config';

const TrelloTokens = function TrelloTokens() {

    this.getTokenMember = async function getTokenMember(apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/tokens/${token}/member`)
            .query({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json');
        return r;
    }
};

export { TrelloTokens }
