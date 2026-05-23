const STORE_URL = 'https://r1040189-realbeans.myshopify.com'
const PASSWORD = 'sebree'
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'q6hxoe',
  e2e: {
    setupNodeEvents(on, config) {},
  },
})

function enterPassword() {
  cy.visit(STORE_URL)
  cy.get('body').then(($body) => {
    if ($body.find('input[name="password"]').length > 0) {
      cy.get('input[name="password"]').type(PASSWORD)
      cy.get('button[type="submit"]').click()
    }
  })
}

describe('RealBeans Shopify Store', () => {

  it('Homepage intro text is visible', () => {
    enterPassword()
    cy.contains('Since 1801, RealBeans has roasted premium coffee').should('exist')
  })

  it('Product catalog shows correct items', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all')
    cy.contains('Roasted coffee beans 5kg').should('exist')
    cy.contains('Blended coffee 5kg').should('exist')
  })

  it('Sorting by price changes order', () => {
    enterPassword()
    cy.visit(STORE_URL + '/collections/all')
    cy.get('select[name="sort_by"]').first().select('price-ascending')
    cy.url().should('include', 'sort_by=price-ascending')
  })

  it('Product detail page shows correct info', () => {
    enterPassword()
    cy.visit(STORE_URL + '/products/roasted-coffee-beans-5kg')
    cy.contains('Roasted coffee beans 5kg').should('exist')
    cy.contains('Our best and sustainable real roasted beans.').should('exist')
  })

  it('About page has history paragraph', () => {
    enterPassword()
    cy.visit(STORE_URL + '/pages/about')
    cy.contains('From a small Antwerp grocery').should('exist')
  })

})