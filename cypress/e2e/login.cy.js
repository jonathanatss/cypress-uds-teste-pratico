describe('Login Test', () => {
  beforeEach(() => {
    // Garante que cada teste começa na tela de login
    cy.visit('https://www.saucedemo.com/')
  })

  it('should log in with valid credentials', () => {
    cy.login()

    // Verifica se o título da página está correto
    cy.get('.title').should(
      'have.text',
      'Products',
      'O título da página deve ser "Products" após login'
    )

    // Verifica se há produtos listados
    cy.get('.inventory_item').should(
      'have.length.greaterThan',
      0,
      'Deve haver pelo menos um produto listado'
    )

    // Verifica se o botão de logout está visível
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').should(
      'be.visible',
      'O botão de logout deve estar visível'
    )

    // Verifica se um produto específico está listado
    cy.contains('.inventory_item_name', 'Sauce Labs Backpack').should(
      'be.visible',
      'O produto "Sauce Labs Backpack" deve estar visível na lista'
    )
  })

  it('should not log in with invalid credentials', () => {
    cy.get('#user-name').type('usuario_incorreto')
    cy.get('#password').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    // Valida mensagem de erro de login
    cy.get('[data-test="error"]').should(
      'be.visible',
      'A mensagem de erro deve ser exibida para login inválido'
    ).and(
      'contain',
      'Username and password do not match any user in this service'
    )
  })
})
