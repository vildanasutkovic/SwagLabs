const myFle = require("os")
const { hasUncaughtExceptionCaptureCallback } = require("process")

describe('Swag Labs page', function () {

  beforeEach(function() {
    cy.fixture('example')
      .then(function(data){
        this.data=data
      })
    Cypress.Cookies.preserveOnce('session-username', 'remember_token')
  })

  it('Login with invalid username', function() {
    cy.visit('https://www.saucedemo.com/')
      .get('input[id="user-name"]').type(this.data.username1)
      .get('input[id="password"]').type(this.data.password)
      .get('input[id="login-button"]').click()
      .get('.error-message-container').contains('Epic sadface: Username and password do not match any user in this service')
  })

  it('Login with invalid password', function() {
    cy.visit('https://www.saucedemo.com/')
      .get('input[id="user-name"]').type(this.data.username)
      .get('input[id="password"]').type(this.data.password1)
      .get('input[id="login-button"]').click()
  })

  it('Login with valid credentials', function() {
    cy.visit('https://www.saucedemo.com/') 
      .get('input[id="user-name"]').type(this.data.username)
      .get('input[id="password"]').type(this.data.password)
      .get('input[id="login-button"]').click()
      
    })

  it('Shopping cart tests', function() {
    cy.get('.shopping_cart_link').click()
      .get('[data-test=continue-shopping]').click()
      .get('[data-test=add-to-cart-sauce-labs-backpack]').click()
      .get('[data-test=add-to-cart-sauce-labs-fleece-jacket]').click()
      .get('.shopping_cart_link').click()
      .get('[data-test=checkout]').click() 
      .get('[data-test=cancel]').click()
      .get('[data-test=remove-sauce-labs-fleece-jacket]').click()
      .get('[data-test=continue-shopping]').click()
      .get('.shopping_cart_badge').contains('1')
  })

  it('Check text fields', function() {
    cy.get('#item_4_title_link > .inventory_item_name').contains('Sauce Labs Backpack')
      .get('.footer_copy').contains('© 2021 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy')
      .get('#item_3_title_link > .inventory_item_name').click()
      .get('.inventory_details_desc').contains('This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.')
      .go('back')
  })

  it('Sort products', function() {
    cy.get('[data-test=product_sort_container]').select('lohi')
  })

  it('Social media links', function() {
    cy.get('.social_twitter > a').invoke('removeAttr', 'target').should('have.attr', 'href', 'https://twitter.com/saucelabs').click()
      .go('back')
      .get('.social_facebook > a').invoke('removeAttr', 'target').should('have.attr', 'href', 'https://www.facebook.com/saucelabs').click()
      .go('back')
      .get('.social_linkedin > a').invoke('removeAttr', 'target').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/').click()
      .go('back')
  })

  it('Logout', function() {
    cy.get('button[id="react-burger-menu-btn"]')
      .click()
      .get('a[id="logout_sidebar_link"]')
      .click()
  })
})