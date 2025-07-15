class LoginPage {
    constructor(page) {
        this.page = page;
        this.selectors = {
            usernameInput: '#username',
            passwordInput: '#password',
            loginButton: 'button[type="submit"]',
            errorMessage: '.flash.error',
        }

        this.loginURL = '/login';
    }

    async fillUsername(value) {
        await this.fillField(this.selectors.usernameInput, value);
    }

    async fillPassword(value) {
        await this.fillField(this.selectors.passwordInput, value);
    }

    async fillField(selector, value) {
        await this.page.locator(selector).fill(value);
    }

    async clickLogin() {
        await this.page.getByRole('button', 'Login').click();
    }

    async checkMessage() {

    }
}

module.exports = LoginPage;