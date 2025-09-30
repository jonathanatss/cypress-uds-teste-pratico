// cypress/support/commands.js

import LoginPage from '../pages/LoginPage';

/**
 * Performs login using Page Objects.
 * Uses credentials from the Cypress config file.
 */
Cypress.Commands.add('login', (
  username = Cypress.env('username'),
  password = Cypress.env('password')
) => {
  LoginPage.visit();
  LoginPage.fillUsername(username);
  LoginPage.fillPassword(password);
  LoginPage.submit();
  cy.url().should('include', '/inventory.html');
});

// -- API Commands (These are well-structured and can remain) --

// Creates a new booking in the Restful Booker API
Cypress.Commands.add('createBooking', (payload) => {
  return cy.request('POST', 'https://restful-booker.herokuapp.com/booking', payload);
});

// Gets bookings by firstname from the Restful Booker API
Cypress.Commands.add('getBookingByFirstname', (firstname) => {
  return cy.request('GET', `https://restful-booker.herokuapp.com/booking?firstname=${firstname}`);
});

// Creates a booking with an invalid payload in the Restful Booker API
Cypress.Commands.add('createInvalidBooking', (invalidPayload) => {
  return cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body: invalidPayload,
    failOnStatusCode: false
  });
});