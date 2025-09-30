/**
 * Test file for the Restful Booker API
 * Base URL: https://restful-booker.herokuapp.com
 * Documentation: https://restful-booker.herokuapp.com/apidoc/index.html
 *
 * 1. Create a booking successfully.
 * 2. Get the created booking by firstname.
 * 3. Attempt to create a booking with an invalid payload.
 * 4. Search for a firstname that does not exist.
 */

describe('API Test Scenarios for Restful Booker', () => {
  // Variables to share state between tests
  let bookingId;
  let bookingFirstname;

  // Ensures each test starts without residual data
  beforeEach(() => {
    bookingId = undefined;
    bookingFirstname = undefined;
  });

  // Scenario 1: Create a new booking successfully
  it('Scenario 1: Should create a new booking successfully', () => {
    const payload = {
      firstname: 'Jonathan',
      lastname: 'Silva',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-09-01',
        checkout: '2025-09-05',
      },
      additionalneeds: 'Breakfast',
    };

    cy.createBooking(payload).then((response) => {
      expect(response.status, 'Status should be 200 when creating a booking').to.eq(200);
      expect(response.body, 'Response should contain a bookingid').to.have.property('bookingid');
      expect(response.body.booking.firstname, 'Firstname should match the payload').to.eq(payload.firstname);
      expect(response.body.booking.totalprice, 'Totalprice should match the payload').to.eq(payload.totalprice);

      bookingId = response.body.bookingid;
      bookingFirstname = response.body.booking.firstname;

      cy.log(`Booking ID created: ${bookingId}`);
      cy.log(`Firstname for search: ${bookingFirstname}`);
    });
  });

  // Scenario 2: Create and then get the booking by firstname
  it('Scenario 2: Should create and then retrieve the booking by firstname', () => {
    const payload = {
      firstname: 'Jonathan',
      lastname: 'Tester',
      totalprice: 250,
      depositpaid: true,
      bookingdates: {
        checkin: '2025-09-01',
        checkout: '2025-09-05',
      },
      additionalneeds: 'Breakfast',
    };

    // Create the booking before searching
    cy.createBooking(payload).then((response) => {
      expect(response.status, 'Status should be 200 when creating a booking').to.eq(200);
      const createdBookingId = response.body.bookingid;
      const createdFirstname = response.body.booking.firstname;

      cy.getBookingByFirstname(createdFirstname).then((searchResponse) => {
        expect(searchResponse.status, 'Status should be 200 when searching for the booking').to.eq(200);
        expect(searchResponse.body, 'Body should be a non-empty array').to.be.an('array').and.not.be.empty;

        const ids = searchResponse.body.map((booking) => booking.bookingid);
        expect(ids, 'The created booking ID should be in the search results').to.include(createdBookingId);
      });
    });
  });

  // Scenario 3: Error when creating a booking with an invalid payload
  it('Scenario 3: Should return an error when trying to create a booking with an invalid payload', () => {
    const invalidPayload = {
      totalprice: 150,
    };

    cy.createInvalidBooking(invalidPayload).then((response) => {
      expect(response.status, 'Status should be 500 for an invalid payload').to.eq(500);
    });
  });

  // Scenario 4: Search for a non-existent firstname
  it('Scenario 4: Should return an empty list when searching for a non-existent firstname', () => {
    const nonExistentName = `NonExistent${Date.now()}`;

    cy.getBookingByFirstname(nonExistentName).then((response) => {
      expect(response.status, 'Status should be 200 when searching for a non-existent name').to.eq(200);
      expect(response.body, 'Body should be an empty array').to.be.an('array').and.to.be.empty;
    });
  });
});