import React from 'react'
import PercentageChange from './PercentageChange'

describe('PercentageChange Component', () => {
  beforeEach(() => {
    cy.mount(<PercentageChange percentage={5} />)
  })

  it('should have the correct className and attributes', () => {
    cy.get('#percentage')
      .should('have.class', 'text-green-500')
      .find('svg')
      .should('exist')
      .and('have.attr', 'viewBox', '0 0 25 25')
      .and('have.attr', 'fill', 'currentColor')
      .and('have.attr', 'stroke', 'currentColor')
      .and('have.attr', 'stroke-width', '1')
      .and('have.class', 'w-5 h-5')

    cy.get('#percentage')
      .find('div')
      .should('contain', '%')
      .should('have.class', 'font-semibold')
  })
})
