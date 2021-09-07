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

      cy.get('.attentionContent')
        .should('contain', 'logged in as Matti Luukkainen')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('random')
      cy.get('#password').type('wrong')
      cy.contains('login').click()

      cy.get('.alertContent')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('#username')
      cy.get('#password')
      cy.contains('login')

      cy.get('html').should(
        'not.contain',
        'Matti Luukkainen logged in'
      )
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login/', {
        username: 'mluukkai',
        password: 'salainen'
      }).then((response) => {
        localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type(
        'Disadvantages of Scrum and how to overcome them'
      )
      cy.get('#author').type('Juho Salmi')
      cy.get('#url').type(
        'https://gofore.com/disadvantages-of-scrum-and-how-to-overcome-them/'
      )
      cy.get('#submitBlog').click()
      cy.contains(
        'Disadvantages of Scrum and how to overcome them by Juho Salmi'
      )
    })
  })
})
