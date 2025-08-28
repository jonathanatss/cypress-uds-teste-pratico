// Realiza login utilizando usuário e senha do cypress.env.json
Cypress.Commands.add('login', () => {
  const username = Cypress.env('username')
  const password = Cypress.env('password')
  cy.visit('https://www.saucedemo.com/')
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('[data-test="login-button"]').click()
  cy.url().should('include', '/inventory.html')
})

// Adiciona um produto ao carrinho e valida se o badge do carrinho foi atualizado
Cypress.Commands.add('addProductToCart', (productSelector = '[data-test="add-to-cart-sauce-labs-backpack"]') => {
  cy.get(productSelector).click()
  cy.get('.shopping_cart_badge').should('have.text', '1')
})

// Acessa o carrinho e valida se o produto informado está presente
Cypress.Commands.add('goToCartAndValidateProduct', (productName = 'Sauce Labs Backpack') => {
  cy.get('.shopping_cart_link').click()
  cy.url().should('include', '/cart.html')
  cy.contains('.inventory_item_name', productName).should('be.visible')
})

// Inicia o checkout e preenche os dados obrigatórios do comprador
Cypress.Commands.add('checkout', (firstName = 'João', lastName = 'Silva', postalCode = '12345') => {
  cy.get('[data-test="checkout"]').click()
  cy.url().should('include', '/checkout-step-one.html')
  cy.get('[data-test="firstName"]').type(firstName)
  cy.get('[data-test="lastName"]').type(lastName)
  cy.get('[data-test="postalCode"]').type(postalCode)
  cy.get('[data-test="continue"]').click()
  cy.url().should('include', '/checkout-step-two.html')
})

// Valida o resumo do checkout: nome do produto, preço, subtotal, imposto e total
Cypress.Commands.add('validateCheckoutSummary', (productName = 'Sauce Labs Backpack') => {
  cy.get('.inventory_item_name').should('have.text', productName)
  cy.get('.inventory_item_price').should('exist')
  cy.get('.summary_subtotal_label').should('contain', 'Item total:')
  cy.get('.summary_tax_label').should('contain', 'Tax:')
  cy.get('.summary_total_label').should('contain', 'Total:')
})

// Finaliza a compra e valida a mensagem de sucesso na tela de confirmação
Cypress.Commands.add('finishPurchaseAndValidate', () => {
  cy.get('[data-test="finish"]').click()
  cy.url().should('include', '/checkout-complete.html')
  cy.get('.complete-header').should('have.text', 'Thank you for your order!')
})

// Retorna para a tela de produtos, acessa o carrinho e valida que está vazio
Cypress.Commands.add('validateCartIsEmpty', () => {
  cy.get('[data-test="back-to-products"]').click()
  cy.get('.shopping_cart_link').click()
  cy.get('.cart_item').should('not.exist')
})

// Cria uma nova reserva (booking) na API Restful Booker
Cypress.Commands.add('createBooking', (payload) => {
  return cy.request('POST', 'https://restful-booker.herokuapp.com/booking', payload)
})

// Busca reservas pelo firstname na API Restful Booker
Cypress.Commands.add('getBookingByFirstname', (firstname) => {
  return cy.request('GET', `https://restful-booker.herokuapp.com/booking?firstname=${firstname}`)
})

// Cria uma reserva com payload inválido na API Restful Booker
Cypress.Commands.add('createInvalidBooking', (invalidPayload) => {
  return cy.request({
    method: 'POST',
    url: 'https://restful-booker.herokuapp.com/booking',
    body: invalidPayload,
    failOnStatusCode: false
  })
})