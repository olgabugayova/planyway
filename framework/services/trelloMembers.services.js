import supertest from 'supertest';
import { urls } from '../config';

const TrelloMembers = function TrelloMembers() {

    this.getMember = async function getMember(memberId, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${memberId}?key=${apiKey}&token=${token}&fields=fullName%2Cemail&organizations=all&organization_fields=name%2CdisplayName%2ClogoHash%2Climits%2Cmemberships%2Cprefs%2CpremiumFeatures&boards=all&board_fields=id`)
            .set('Accept', 'application/json');
        return r;
    }
};

export { TrelloMembers }
