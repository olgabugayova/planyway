import chai from 'chai';
import { goto, run, stop } from '../framework/lib/browser';
import { application } from '../framework/pages';

const { expect } = chai;
let page;
let app;

describe('`Авторизователься в Planyway', () => {
    beforeEach(async () => {
        await run();
        page = await goto('https://planyway.com/app');
        app = application(page);

    });
    afterEach(async () => {
        await stop();
    });

    it('Пользователь может авторизователься в Planyway через Trello', async() => {
        await app.LoginPage().login();
        expect(await app.HomePage().getAccountText()).to.have.string('Account');
    });
});
