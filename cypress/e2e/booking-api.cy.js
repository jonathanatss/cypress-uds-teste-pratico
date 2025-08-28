/**
 * Arquivo de teste para a API Restful Booker
 * URL Base: https://restful-booker.herokuapp.com
 * Documentação: https://restful-booker.herokuapp.com/apidoc/index.html
 *
 * 1. Criar uma reserva com sucesso.
 * 2. Buscar a reserva criada pelo firstname.
 * 3. Tentar criar uma reserva com payload inválido.
 * 4. Buscar por um firstname que não existe.
 */

describe('Cenários de teste de API para Restful Booker', () => {
  // Variáveis para compartilhar o estado entre os testes
  let bookingId
  let bookingFirstname

  // Garante que cada teste começa sem dados residuais
  beforeEach(() => {
    bookingId = undefined
    bookingFirstname = undefined
  })

  // Cenário 1: Criar uma reserva com sucesso
  it('Cenário 1: Deve criar uma nova reserva (booking) com sucesso', () => {
    const payload = {
      firstname: 'Jonathan',
      lastname: 'Silva',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-09-01',
        checkout: '2025-09-05'
      },
      additionalneeds: 'Café da manhã'
    }

    cy.createBooking(payload).then((response) => {
      expect(response.status, 'Status deve ser 200 ao criar booking').to.eq(200)
      expect(response.body, 'Response deve conter bookingid').to.have.property('bookingid')
      expect(response.body.booking.firstname, 'Firstname deve ser igual ao enviado').to.eq(payload.firstname)
      expect(response.body.booking.totalprice, 'Totalprice deve ser igual ao enviado').to.eq(payload.totalprice)

      bookingId = response.body.bookingid
      bookingFirstname = response.body.booking.firstname

      cy.log(`Booking ID criado: ${bookingId}`)
      cy.log(`Firstname para busca: ${bookingFirstname}`)
    })
  })

  // Cenário 2: Buscar a reserva criada pelo firstname
  it('Cenário 2: Deve criar e buscar a reserva pelo firstname', () => {
    const payload = {
      firstname: 'Jonathan',
      lastname: 'Tester',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-09-01',
        checkout: '2025-09-05'
      },
      additionalneeds: 'Café da manhã'
    }

    // Cria o booking antes de buscar
    cy.createBooking(payload).then((response) => {
      expect(response.status, 'Status deve ser 200 ao criar booking').to.eq(200)
      const bookingId = response.body.bookingid
      const bookingFirstname = response.body.booking.firstname

      cy.getBookingByFirstname(bookingFirstname).then((response) => {
        expect(response.status, 'Status deve ser 200 ao buscar booking').to.eq(200)
        expect(response.body, 'Body deve ser um array não vazio').to.be.an('array').and.not.be.empty

        const ids = response.body.map(booking => booking.bookingid)
        expect(ids, 'Booking ID deve estar na lista de resultados').to.include(bookingId)
      })
    })
  })

  // Cenário 3: Erro ao criar booking com payload inválido
  it('Cenário 3: Deve retornar erro ao tentar criar reserva com payload inválido', () => {
    const invalidPayload = {
      totalprice: 150
    }

    cy.createInvalidBooking(invalidPayload).then((response) => {
      expect(response.status, 'Status deve ser 500 para payload inválido').to.eq(500)
    })
  })

  // Cenário 4: Buscar por um firstname inexistente
  it('Cenário 4: Deve retornar uma lista vazia ao buscar por um firstname inexistente', () => {
    const nonExistentName = `Inexistente${Date.now()}`

    cy.getBookingByFirstname(nonExistentName).then((response) => {
      expect(response.status, 'Status deve ser 200 ao buscar por nome inexistente').to.eq(200)
      expect(response.body, 'Body deve ser um array vazio').to.be.an('array').and.to.be.empty
    })
  })
})