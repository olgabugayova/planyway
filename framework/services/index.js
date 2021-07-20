import { TrelloBoards } from './trelloBoards.services';
import { TrelloTokens } from './trelloToken.services';
import { TrelloMembers } from './trelloMembers.services';
import { TrelloCards } from './trelloCards.services';


const apiProvider = () => ({
    TrelloBoards: () => new TrelloBoards(),
    TrelloCards: () => new TrelloCards(),
    TrelloMembers: () => new TrelloMembers(),
    TrelloTokens: () => new TrelloTokens(),

});

export { apiProvider };
