
class InventoryPage {
  getPageTitle() {
    return cy.get('.title');
  }

  getInventoryList() {
    return cy.get('.inventory_item');
  }

  getCartBadge() {
    return cy.get('.shopping_cart_badge');
  }

  addProductToCart(productName) {
    cy.contains('.inventory_item', productName)
      .find('button[data-test^="add-to-cart-"]')
      .click();
  }

  goToCart() {
    cy.get('.shopping_cart_link').click();
  }

  openMenu() {
    cy.get('#react-burger-menu-btn').click();
  }

  getLogoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  getProductByName(name) {
    return cy.contains('.inventory_item_name', name);
  }
}

export default new InventoryPage();