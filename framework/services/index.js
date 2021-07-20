import { TrelloBoards } from './trelloBoards.services';
import { TrelloTokens } from './trelloToken.services';
import { TrelloMembers } from './trelloMembers.services';


const apiProvider = () => ({
    TrelloBoards: () => new TrelloBoards(),
    TrelloMembers: () => new TrelloMembers(),
    TrelloTokens: () => new TrelloTokens(),

});

export { apiProvider };
