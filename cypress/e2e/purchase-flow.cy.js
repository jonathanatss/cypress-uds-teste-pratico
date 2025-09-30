// cypress/e2e/purchase-flow.cy.js

import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Complete Purchase Flow', () => {
  beforeEach(() => {
    // Loads data from the fixture before each test
    cy.fixture('example.json').as('userData');
    // Ensures each test starts by logging in
    cy.login();
  });

  it('should complete a purchase successfully', function () {
    const productName = 'Sauce Labs Backpack';
    const { firstName, lastName, postalCode } = this.userData.checkout;

    // Add "Sauce Labs Backpack" to the cart and validate the badge
    InventoryPage.addProductToCart(productName);
    InventoryPage.getCartBadge().should('have.text', '1');

    // Go to the cart and validate that the product is present
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    CartPage.validateProductInCart(productName);

    // Start the checkout process and fill in the required fields
    CartPage.goToCheckout();
    cy.url().should('include', '/checkout-step-one.html');
    CheckoutPage.fillCheckoutInformation(firstName, lastName, postalCode);

    // Validate the checkout summary: product, price, subtotal, tax, and total
    cy.url().should('include', '/checkout-step-two.html');
    CheckoutPage.validateCheckoutSummary(productName);

    // Finish the purchase and validate the success message
    CheckoutPage.finishPurchase();
    cy.url().should('include', '/checkout-complete.html');
    CheckoutPage.validateOrderConfirmation();

    // Return to the products page, go to the cart, and validate that it is empty
    CheckoutPage.backToProducts();
    InventoryPage.goToCart();
    CartPage.validateCartIsEmpty();
  });
});