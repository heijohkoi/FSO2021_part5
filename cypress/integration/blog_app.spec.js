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
      cy.login({ username: 'mluukkai', password: 'salainen' })
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

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title:
            'Ethical design and value-based decisions guiding the work',
          author: 'Suvi Leander',
          url: 'https://gofore.com/ethical-design-and-value-based-decisions-guiding-the-work/'
        })
        cy.createBlog({
          title: 'Advanced React Hooks: The Strategy Pattern',
          author: 'Antti Pekka Vilkko',
          url: 'https://gofore.com/advanced-react-hooks-the-strategy-pattern/'
        })
        cy.createBlog({
          title: 'Devops 101 – Part 3-2: Failure is always an option',
          author: 'Aki Mäkinen',
          url: 'https://gofore.com/devops-101-part-3-2-failure-is-always-an-option/'
        })
      })

      it('a blog can be liked', function () {
        cy.contains(
          'Ethical design and value-based decisions guiding the work by Suvi Leander'
        ).click()

        cy.get('.blogContent')
          .should(
            'contain',
            'https://gofore.com/ethical-design-and-value-based-decisions-guiding-the-work/'
          )
          .and('contain', '0')
          .and('contain', 'like')

        cy.contains('like').click()

        cy.get('.blogContent')
          .should(
            'contain',
            'https://gofore.com/ethical-design-and-value-based-decisions-guiding-the-work/'
          )
          .and('contain', '1')
      })

      it('own blog can be deleted', function () {
        cy.contains(
          'Ethical design and value-based decisions guiding the work by Suvi Leander'
        ).click()

        cy.contains('remove').click()
        cy.get('.attentionContent')
          .should('contain', 'Blog deleted')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('html').should(
          'not.contain',
          'Ethical design and value-based decisions guiding the work by Suvi Leander'
        )
      })
      // it.only('blogs are arranged by likes', function () {
      //   cy.contains(
      //     'Ethical design and value-based decisions guiding the work by Suvi Leander'
      //   ).click()
      //   cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains(
      //   'Ethical design and value-based decisions guiding the work by Suvi Leander'
      // ).click()

      // cy.contains(
      //   'Advanced React Hooks: The Strategy Pattern by Antti Pekka Vilkko'
      // ).click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains(
      //   'Advanced React Hooks: The Strategy Pattern by Antti Pekka Vilkko'
      // ).click()

      // cy.contains(
      //   'Devops 101 – Part 3-2: Failure is always an option'
      // ).click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains('like').click()
      // cy.contains(
      //   'Devops 101 – Part 3-2: Failure is always an option'
      // ).click()

      // cy.visit('http://localhost:3000')
      // cy.contains(
      //   'Ethical design and value-based decisions guiding the work by Suvi Leander'
      // ).click()
      // cy.contains(
      //   'Advanced React Hooks: The Strategy Pattern by Antti Pekka Vilkko'
      // ).click()
      // cy.contains(
      //   'Devops 101 – Part 3-2: Failure is always an option'
      // ).click()

      // cy.get('.blogContent').as('blogs')
      // cy.get('@blogs').then((blogs) => {
      //   let a = blogs[0].likes
      //   for (let i = 0; i < blogs.length; i++) {
      //     if (blogs[i].likes > a) {
      //       break
      //     }
      //     a = blogs[i].likes
      //   }
      // })
      //   cy.get('.blog').then((blogs) => {
      //     console.log(blogs)
      //     let a = blogs[0].likes
      //     for (let i = 0; i < blogs.length; i++) {
      //       cy.expect(blogs[i].likes).to.be.lessThan(a)
      //       a = blogs[i].likes
      //       console.log(a)
      //     }
      //   })
      // })
    })
  })
})
