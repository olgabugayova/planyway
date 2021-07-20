import { BasePage } from './basePage';
import {user} from '../config/user';

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.loginButton = '.pw-dialog-login__btn';
        this.loginConfirmationButton = '#surface > div > div.consent-confirmation > form > div > a';
        this.trelloAllowButton = '#approveButton';
        this.trelloLoginButton = '#login';
        this.trelloLoginSubmitButton = '#login-submit';
        this.passwordField = '#password';
        this.userField = '#user';

    }
    async login() {
        await this.page.waitForSelector(this.loginButton);
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click(this.loginButton)
        ]);
        await popup.waitForLoadState();
        await popup.waitForSelector(this.loginConfirmationButton);
        await popup.click(this.loginConfirmationButton);
        await popup.waitForSelector(this.userField);
        await popup.click(this.userField);
        await popup.fill(this.userField, user.email);
        await popup.waitForSelector(this.trelloLoginButton);
        await popup.click(this.trelloLoginButton);
        await popup.waitForSelector(this.passwordField);
        await popup.fill(this.passwordField, user.password);
        await popup.click(this.trelloLoginSubmitButton);
        await popup.waitForSelector(this.trelloAllowButton);
        const approveButton = await popup.$(this.trelloAllowButton);
        await approveButton.isEnabled();
        await approveButton.click();
    };
}

export { LoginPage };