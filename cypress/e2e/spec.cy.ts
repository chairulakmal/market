describe('Home', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/wallet/supportedCurrencies', {
      fixture: 'currencies.json',
    })
    cy.intercept('GET', '/api/trade/price-changes/', {
      fixture: 'prices.json',
    })
    cy.visit('http://localhost:3000/')
  })

  it('should display the table with correct data', () => {
    cy.get('tbody tr').should('have.length', 120)

    cy.get('tbody tr')
      .eq(0)
      .within(() => {
        cy.get('td').eq(0).should('contain', 'Bitcoin')
        cy.get('td').eq(1).should('contain', 'BTC/IDR')
        cy.get('td')
          .eq(3)
          .within(() => {
            cy.get('div#percentage').should('have.class', 'text-green-500')
            cy.get('div#percentage').should('contain', '%')
          })
      })
  })

  it('should open the external link in a new tab on row click', () => {
    cy.get('tbody tr').eq(0).click()
    cy.url().should('contain', 'localhost:3000')
  })
})
