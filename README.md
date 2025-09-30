# Boilerplate de Automação de Testes com Cypress

Bem-vindo! Este é um template de arquitetura de referência para projetos de automação de testes E2E, construído com Cypress e focado em jornadas de e-commerce.

O objetivo é fornecer uma base sólida e padronizada para que novos projetos possam ser configurados rapidamente, seguindo as melhores práticas de organização de código, reutilização e qualidade.

## Índice

- [1. Propósito](#1-propósito)
- [2. Pré-requisitos](#2-pré-requisitos)
- [3. Começando (Instalação e Setup)](#3-começando-instalação-e-setup)
- [4. Estrutura de Pastas](#4-estrutura-de-pastas)
- [5. Scripts Disponíveis](#5-scripts-disponíveis)
- [6. Arquitetura e Padrões](#6-arquitetura-e-padrões)
  - [Page Object Model (POM)](#page-object-model-pom)
  - [Comandos Customizados](#comandos-customizados)
  - [Fixtures para Dados de Teste](#fixtures-para-dados-de-teste)
- [7. Como Adicionar Novos Testes (Passo a Passo)](#7-como-adicionar-novos-testes-passo-a-passo)
- [8. Qualidade e Padronização de Código](#8-qualidade-e-padronização-de-código)
- [9. Configuração do Cypress](#9-configuração-do-cypress)

## 1. Propósito

Este repositório serve como um **ponto de partida padrão** para todos os novos projetos de automação de testes. Ele já vem com uma estrutura de pastas definida, bibliotecas de apoio e ferramentas de qualidade de código (Linting, Formatting) instaladas e configuradas, além de um exemplo prático de um teste E2E.

## 2. Pré-requisitos

Antes de começar, garanta que você tenha o seguinte software instalado em sua máquina:

- **Node.js**: Versão 16.x ou superior.
- **NPM** (ou **Yarn**): Geralmente instalado junto com o Node.js.

## 3. Começando (Instalação e Setup)

Siga os passos abaixo para configurar o ambiente de desenvolvimento local.

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    Este comando irá instalar o Cypress e todas as outras bibliotecas de desenvolvimento listadas no `package.json`.
    ```bash
    npm install
    ```
    Após a instalação, todas as dependências estarão na pasta `node_modules` e o projeto estará pronto para ser usado.

## 4. Estrutura de Pastas

A arquitetura foi organizada para separar as responsabilidades, facilitando a manutenção e a reutilização de código.

```plaintext
/seu-projeto
├── cypress/
│   ├── e2e/
│   │   └── e-commerce/
│   │       └── purchase-flow.cy.js  <-- ARQUIVOS DE TESTE (SPECS)
│   ├── fixtures/
│   │   └── user-data.json             <-- DADOS DE TESTE (FIXTURES)
│   ├── pages/
│   │   ├── LoginPage.js               <-- PAGE OBJECTS
│   │   └── ...
│   └── support/
│       ├── commands.js                <-- COMANDOS CUSTOMIZADOS
│       └── e2e.js                     <-- Arquivo de setup do Cypress
│
├── .eslintrc.json                     <-- Configuração do ESLint (Qualidade de Código)
├── .prettierrc                        <-- Configuração do Prettier (Formatação)
├── cypress.config.js                  <-- Configuração principal do Cypress
├── package.json                       <-- Dependências e scripts do projeto
└── README.md                          <-- Esta documentação
```

- **`cypress/e2e`**: O coração do projeto, onde ficam os arquivos de teste (specs).
- **`cypress/pages`**: Onde os **Page Objects** são definidos. Cada arquivo representa uma página da aplicação.
- **`cypress/support`**: Arquivos de suporte. `commands.js` é usado para criar comandos customizados (ex: `cy.login()`).
- **`cypress/fixtures`**: Usado para armazenar dados de teste estáticos, como massas de dados em formato JSON.

## 5. Scripts Disponíveis

Os seguintes scripts estão disponíveis no `package.json` e podem ser executados com `npm run <nome-do-script>`:

- **`cy:open`**: Abre a interface interativa do Cypress, ideal para desenvolver e depurar testes.
- **`cy:run`**: Executa todos os testes em modo *headless* (sem interface gráfica), ideal para CI/CD.
- **`lint`**: Verifica o código em busca de erros de padronização, com base nas regras do ESLint.
- **`lint:fix`**: Tenta corrigir automaticamente os erros de padronização encontrados pelo ESLint.
- **`format`**: Formata todo o código do projeto usando o Prettier, garantindo um estilo consistente.

## 6. Arquitetura e Padrões

### Page Object Model (POM)

Este template utiliza o padrão **Page Object Model**. A ideia é simples:

1.  Cada página da sua aplicação é representada por uma classe (um "Page Object").
2.  Essa classe é o **único lugar** que conhece os seletores (ex: `[data-test="login-button"]`) daquela página.
3.  A classe também expõe métodos que representam as ações que um usuário pode realizar na página (ex: `fillUsername('user')`, `submit()`).

**Vantagens:**
- **Manutenção Simplificada:** Se um seletor mudar na aplicação, você só precisa atualizá-lo em **um único lugar**.
- **Testes Mais Legíveis:** Seus testes se tornam mais declarativos, focando em "o quê" fazer, e não em "como" fazer. Veja a diferença:

  ```javascript
  // SEM Page Object (ruim)
  cy.get('[data-test="username"]').type('user');
  cy.get('[data-test="password"]').type('pass');
  cy.get('[data-test="login-button"]').click();

  // COM Page Object (bom)
  LoginPage.fillUsername('user');
  LoginPage.fillPassword('pass');
  LoginPage.submit();
  ```

### Comandos Customizados

Comandos customizados (`cypress/support/commands.js`) são perfeitos para agrupar múltiplas ações que são repetidas em vários testes. O exemplo principal neste template é o `cy.login()`, que encapsula toda a lógica de login.

**Quando usar um Comando Customizado vs. um Método de Page Object?**
- **Método de Page Object:** Ações que pertencem a **uma única página**. Ex: `LoginPage.fillUsername()`.
- **Comando Customizado:** Ações que envolvem **múltiplas páginas** ou representam uma jornada completa do usuário. Ex: `cy.login()`, que visita a página de login, preenche os campos e submete, resultando em uma navegação para a página de inventário.

### Fixtures para Dados de Teste

A pasta `cypress/fixtures` permite separar os dados de teste da lógica. Isso torna os testes mais flexíveis e fáceis de adaptar.

Para carregar uma fixture em um teste, use `cy.fixture()`:
```javascript
// Dentro de um bloco `beforeEach` ou `it`
cy.fixture('user-data.json').as('userData');

// Para usar os dados no teste (usando `function() {}` no `it`)
it('deve preencher o checkout', function() {
  const { firstName, lastName } = this.userData.checkout;
  CheckoutPage.fillCheckoutInformation(firstName, lastName, '12345');
});
```

## 7. Como Adicionar Novos Testes (Passo a Passo)

Vamos simular a criação de um novo teste para a funcionalidade de "Logout".

**Passo 1: Mapear a Página e Adicionar Métodos ao Page Object**

A ação de logout começa na página de inventário. Vamos adicionar os métodos necessários ao `cypress/pages/InventoryPage.js`:

```javascript
// cypress/pages/InventoryPage.js

class InventoryPage {
  // ... outros métodos ...

  openMenu() {
    cy.get('#react-burger-menu-btn').click();
  }

  getLogoutLink() {
    return cy.get('#logout_sidebar_link');
  }

  clickLogout() {
    this.getLogoutLink().click();
  }
}

export default new InventoryPage();
```

**Passo 2: Criar o Novo Arquivo de Teste**

Crie o arquivo `cypress/e2e/e-commerce/logout.cy.js`.

**Passo 3: Escrever o Teste Usando os Recursos Criados**

Importe os Page Objects necessários e escreva o fluxo do usuário de forma declarativa.

```javascript
// cypress/e2e/e-commerce/logout.cy.js

import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Funcionalidade de Logout', () => {

  beforeEach(() => {
    // Garante que o usuário está logado antes de cada teste
    cy.login();
  });

  it('deve deslogar o usuário com sucesso', () => {
    // Abre o menu
    InventoryPage.openMenu();

    // Clica no link de logout
    InventoryPage.clickLogout();

    // Valida que o usuário foi redirecionado para a página de login
    cy.url().should('not.include', '/inventory.html');
    LoginPage.submit().should('be.visible');
  });
});
```

Pronto! Você criou um novo teste de forma organizada e reutilizável.

## 8. Qualidade e Padronização de Código

Este template vem com **ESLint** e **Prettier** configurados para garantir a consistência e a qualidade do código.

- **ESLint** (`.eslintrc.json`): Analisa o código em busca de erros de sintaxe, bugs comuns e violações de estilo.
- **Prettier** (`.prettierrc`): É um formatador de código "opinativo" que reescreve seu código para garantir um estilo uniforme (espaçamento, aspas, etc.).

**Recomendação:** Configure seu editor de código (como o VS Code) para formatar e corrigir o código automaticamente ao salvar, usando as extensões do ESLint e Prettier.

## 9. Configuração do Cypress

O arquivo `cypress.config.js` é o ponto central de configuração do Cypress. Nele, você pode ajustar:

- `baseUrl`: A URL principal da sua aplicação. Usar isso evita repeti-la em cada `cy.visit()`.
- `env`: Objeto para armazenar variáveis de ambiente, como credenciais de login. **NUNCA** salve senhas ou chaves de API diretamente neste arquivo. Use variáveis de ambiente do sistema para injetar esses valores em seu ambiente de CI/CD.
- `viewportWidth` e `viewportHeight`: Para definir a resolução da tela durante os testes.

Consulte a [documentação oficial do Cypress](https://docs.cypress.io/guides/references/configuration) para ver todas as opções disponíveis.