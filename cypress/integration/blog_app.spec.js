describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('log in to application')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.contains('login').click()

      cy.get('.attentionContent').should(
        'contain',
        'logged in as Matti Luukkainen'
      )
      cy.get('.attentionContent').should(
        'have.css',
        'color',
        'rgb(0, 128, 0)'
      )
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('random')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.alertContent').should('contain', 'Wrong credentials')
      cy.get('.alertContent').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      )
      cy.get('#username')
      cy.get('#password')
      cy.contains('login')
    })
  })
})
