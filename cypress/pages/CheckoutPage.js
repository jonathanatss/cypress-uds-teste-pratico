// cypress/pages/CheckoutPage.js

class CheckoutPage {
  fillCheckoutInformation(firstName, lastName, postalCode) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
  }

  validateCheckoutSummary(productName) {
    cy.get('.inventory_item_name').should('have.text', productName);
    cy.get('.inventory_item_price').should('exist');
    cy.get('.summary_subtotal_label').should('contain', 'Item total:');
    cy.get('.summary_tax_label').should('contain', 'Tax:');
    cy.get('.summary_total_label').should('contain', 'Total:');
  }

  finishPurchase() {
    cy.get('[data-test="finish"]').click();
  }

  validateOrderConfirmation() {
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  }

  backToProducts() {
    cy.get('[data-test="back-to-products"]').click();
  }
}

export default new CheckoutPage();