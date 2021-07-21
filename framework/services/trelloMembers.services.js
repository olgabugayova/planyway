import supertest from 'supertest';
import { urls } from '../config';

const TrelloMembers = function TrelloMembers() {

    this.getMember = async function getMember(memberId, apiKey, token) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${memberId}`)
            .query({
                key: apiKey,
                token: token,
                fields: 'fullName, email',
                organizations: 'all',
                organization_fields: 'name,displayName,logoHash,limits,memberships,prefs,premiumFeatures',
                boards: 'all',
                board_fields: 'id'
            })
            .set('Accept', 'application/json');
        return r;
    };

    this.getMemberBoardIdByName = async function getMemberBoardIdByName(memberId, apiKey, token, boardName) {
        const r = await supertest(urls.trello)
            .get(`/1/members/${memberId}/boards`)
            .query({
                key: apiKey,
                token: token
            })
            .set('Accept', 'application/json');

        const idBoard = r.body
            .filter((board) => board.name === boardName)
            .map((board) => board.id)[0];
        return idBoard;
    };
};

export { TrelloMembers }
