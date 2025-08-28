describe('Fluxo completo de compra', () => {
  beforeEach(() => {
    // Garante que cada teste começa na tela de login
    cy.visit('https://www.saucedemo.com/')
  })

  it('deve realizar uma compra com sucesso', () => {
    // Realiza login utilizando dados do cypress.env.json
    cy.login()

    // Adiciona o produto "Sauce Labs Backpack" ao carrinho e valida o badge
    cy.addProductToCart()

    // Acessa o carrinho e valida se o produto está presente
    cy.goToCartAndValidateProduct()

    // Inicia o processo de checkout e preenche os dados obrigatórios
    cy.checkout()

    // Valida o resumo do checkout: produto, preço, subtotal, imposto e total
    cy.validateCheckoutSummary()

    // Finaliza a compra e valida a mensagem de sucesso
    cy.finishPurchaseAndValidate()

    // Retorna para a tela de produtos, acessa o carrinho e valida que está vazio
    cy.validateCartIsEmpty()
  })
})