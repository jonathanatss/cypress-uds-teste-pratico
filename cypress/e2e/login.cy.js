// cypress/e2e/login.cy.js

import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Login Test', () => {
  beforeEach(() => {
    // Ensures that each test starts on the login screen
    LoginPage.visit();
  });

  it('should log in with valid credentials', () => {
    cy.login();

    // Verify that the page title is correct
    InventoryPage.getPageTitle().should(
      'have.text',
      'Products',
      'The page title should be "Products" after login'
    );

    // Verify that there are products listed
    InventoryPage.getInventoryList().should(
      'have.length.greaterThan',
      0,
      'There should be at least one product listed'
    );

    // Verify that the logout button is visible
    InventoryPage.openMenu();
    InventoryPage.getLogoutLink().should(
      'be.visible',
      'The logout button should be visible'
    );

    // Verify that a specific product is listed
    InventoryPage.getProductByName('Sauce Labs Backpack').should(
      'be.visible',
      'The "Sauce Labs Backpack" product should be visible in the list'
    );
  });

  it('should not log in with invalid credentials', () => {
    LoginPage.fillUsername('incorrect_user');
    LoginPage.fillPassword('wrong_password');
    LoginPage.submit();

    // Validate login error message
    LoginPage.getErrorMessage()
      .should(
        'be.visible',
        'The error message should be displayed for invalid login'
      )
      .and(
        'contain',
        'Username and password do not match any user in this service'
      );
  });
});