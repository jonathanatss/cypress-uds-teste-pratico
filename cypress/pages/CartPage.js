// cypress/pages/CartPage.js

class CartPage {
  validateProductInCart(productName) {
    cy.contains('.inventory_item_name', productName).should('be.visible');
  }

  validateCartIsEmpty() {
    cy.get('.cart_item').should('not.exist');
  }

  goToCheckout() {
    cy.get('[data-test="checkout"]').click();
  }
}

export default new CartPage();