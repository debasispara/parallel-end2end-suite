// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'cy-mobile-commands';

require('cypress-grep')();

before(() => {
	Cypress.on('uncaught:exception', (err, runnable) => {
		// returning false here prevents Cypress from
		// failing the test
		// Learn more about uncaught exception handling here -
		// https://docs.cypress.io/api/events/catalog-of-events#Uncaught-Exceptions
		return false
	})
});
