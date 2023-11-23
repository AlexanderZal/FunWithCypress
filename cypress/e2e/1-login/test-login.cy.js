/// <reference types="cypress" />
import './../../support/commands'
import { loginPage} from "./../../support/page_objects/login_page"

describe('test suite', () => {

	beforeEach("open login page", () => {
		cy.visit('/')
	})

	it('Validate login with valid credentials', () => {
		loginPage.login('validUser', 'validPassword')
		// todo: validation user logged in successfully
		//       I would need valid credentials to do it
	})

	it('Validate login with invalid credentials', () => {
		loginPage.login('invalidUser', 'invaldiPassword')
		loginPage.assertError('Incorrect username/password. Please try again!')
	})

	const testEmails = ["test@test.com", "jannowak@gmail.com"]
	testEmails.forEach((email) => {
		it(`Reset password with valid email: ${email}`, () => {
			loginPage.resetPassword('testUser', email)
			cy.contains('Check your email and open the link we sent to continue').should('exist')
		})
	})

	it('Reset password with invalid email', () => {
		loginPage.resetPassword('testUser', 'invalidemail')
		loginPage.assertError('Wrong argument (email) value. Possible []!')
	})

	it('Validate that can\'t login without username or email', () => {
		loginPage.getContinueButton().should('be.disabled')
	})

	it('Validate that can\'t login without password', () => {
		loginPage.proceedWithUser("testUser")
		loginPage.getLoginButton().should('be.disabled')
	})

	it('Validate that can\'t reset password without email', () => {
		loginPage.proceedWithUser("testUser")
		loginPage.proceedToPasswordReset()
		loginPage.getSendLinkToEmailButton().should('be.disabled')
	})

})