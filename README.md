Este projeto contém exemplos de automação de testes end-to-end utilizando [Cypress](https://www.cypress.io/) para um fluxo de compra em um e-commerce de demonstração ([SauceDemo](https://www.saucedemo.com/)), além de testes de API utilizando o serviço [Restful Booker](https://restful-booker.herokuapp.com/).

> **Este projeto foi desenvolvido como teste prático para a vaga de Analista de Qualidade na empresa UDS Tecnologia.**

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão recomendada: 18+)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Conta no [SauceDemo](https://www.saucedemo.com/) (usuário de demonstração já incluso no projeto)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/jonathanatss/cypress-uds-teste-pratico.git
cd cypress-uds-teste-pratico-main
npm install
```

## Configuração de Ambiente

Os dados sensíveis (usuário e senha) estão armazenados no arquivo `cypress.env.json`.  

## Estrutura dos Testes

- `cypress/e2e/login.cy.js`: Teste de login (válido e inválido) e validações na tela de produtos.
- `cypress/e2e/purchase-flow.cy.js`: Fluxo completo de compra, do login à finalização do pedido.
- `cypress/e2e/booking-api.cy.js`: Testes de API para o serviço Restful Booker (criação, busca e validação de reservas).
- `cypress/support/commands.js`: Comandos customizados Cypress para reutilização de lógicas comuns em UI e API.

## Executando os Testes

### Modo Interativo (GUI)

```bash
npx cypress open
```

### Modo Headless (linha de comando)

```bash
npx cypress run
```

## Relatórios de Teste

Os relatórios dos testes agora são gerados automaticamente utilizando o plugin **mochawesome**.  
Após rodar os testes em modo headless, os relatórios em HTML e JSON estarão disponíveis na pasta:

```
cypress/reports
```

Abra o arquivo `.html` gerado para visualizar o relatório detalhado dos testes.

## Scripts Úteis

- `npm run lint`: Executa o linter nos arquivos do Cypress.
- `npm run lint:fix`: Corrige automaticamente problemas de lint.

## Principais Comandos Customizados

### UI (SauceDemo)
- `cy.login()`: Realiza login usando usuário e senha do ambiente.
- `cy.addProductToCart()`: Adiciona o produto padrão ao carrinho.
- `cy.goToCartAndValidateProduct()`: Valida se o produto está no carrinho.
- `cy.checkout()`: Preenche os dados obrigatórios do checkout.
- `cy.validateCheckoutSummary()`: Valida resumo do pedido.
- `cy.finishPurchaseAndValidate()`: Finaliza a compra e valida mensagem de sucesso.
- `cy.validateCartIsEmpty()`: Garante que o carrinho está vazio após a compra.

### API (Restful Booker)
- `cy.createBooking(payload)`: Cria uma nova reserva na API.
- `cy.getBookingByFirstname(firstname)`: Busca reservas pelo nome.
- `cy.createInvalidBooking(payload)`: Tenta criar uma reserva com payload inválido.

## Observações

- Os testes utilizam o site [SauceDemo](https://www.saucedemo.com/) e a API [Restful Booker](https://restful-booker.herokuapp.com/) apenas para fins de estudo e teste prático para a UDS Tecnologia.
- Para adicionar novos comandos customizados, edite o arquivo `cypress/support/commands.js`.
- Para alterar os dados de login, edite o arquivo `cypress.env.json`.

## Licença

Este projeto é apenas para fins educacionais e de teste.

