
export class LoginPage {

	proceedWithUser(username) {
		cy.get('#realm-form-username').type(username).should('have.value', username)
		this.getContinueButton().click()
	}

	proceedWithPassword(password){
		cy.get('#login-form-password').type(password)
		this.getLoginButton().click()
	}

	login(user, password) {
		this.proceedWithUser(user)
		cy.get('#login-form-username').should('have.value', user)
		this.proceedWithPassword(password)
	}

	assertError(errorMessage) {
		cy.get('#notistack-snackbar').should('have.text', errorMessage)
	}

	proceedToPasswordReset() {
		cy.contains('button', 'Forgot your password?').click()
	}

	typeEmailForPasswordReset(email) {
		cy.get('#password-reset-form-password').type(email).should('have.value', email)
	}

	sendLinkToEmail() {
		this.getSendLinkToEmailButton().click()
	}

	resetPassword(user, email) {
		this.proceedWithUser(user)
		this.proceedToPasswordReset()
		this.typeEmailForPasswordReset(email)
		this.sendLinkToEmail()
	}

	getContinueButton(){
		return cy.get('[data-testid="realm-submit-button"]')
	}

	getLoginButton(){
		return cy.get('[data-testid="login-submit-button"]')
	}

	getSendLinkToEmailButton(){
		return cy.contains('[data-testid="password-reset-submit-button"]', 'Send link to email')
	}
}

export const loginPage = new LoginPage()