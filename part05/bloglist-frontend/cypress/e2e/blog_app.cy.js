describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({
      name: 'Lumi',
      username: 'lumiko',
      password: 'testpw'
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.wait(500) // apparently this test executes too fast, so loading the page fails for the next one without timeout sometimes
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in to application')
      cy.get('#username-input').type('lumiko')
      cy.get('#password-input').type('testpw')
      cy.get('#login-button').click()

      cy.contains('Lumi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in to application')
      cy.get('#username-input').type('lumiko')
      cy.get('#password-input').type('wrongpw')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.createUser({
        name: 'SuperUser',
        username: 'root',
        password: 'root1234'
      })

      cy.login({ username: 'root', password: 'root1234' })
      cy.addBlog({ title: 'Administrator Blog', author: 'Admin', url: 'www.random.org', likes: 3 })

      cy.login({ username: 'lumiko', password: 'testpw' })
      cy.addBlog({ title: 'Full Stack Open', author: 'lumi', url: 'www.fullstackopen.com', likes: 6 })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.title-input').type('A test blogpost')
      cy.get('.author-input').type('lumiko')
      cy.get('.url-input').type('www.google.com')
      cy.get('.create-button').click()

      cy.contains('A test blogpost lumiko')
    })

    it('Users can like a post', function() {
      cy.get('.visibleButton').eq(1).click()
      cy.get('.like-button').click()
      cy.contains('likes 4')
    })

    it('Users can delete their own blog', function() {
      cy.get('.visibleButton').eq(0).click()
      cy.get('.delete-button').click()
      cy.get('.notice').contains('Blog Full Stack Open by lumi removed')
    })

    it('Users cannot see delete button for others\' blogs', function() {
      cy.get('.visibleButton').eq(1).click()
      cy.get('.delete-button').should('not.exist')
      cy.contains('SuperUser')
      cy.contains('www.fullstackopen.com').should('not.exist')
    })

    it('Blogs are ordered by likes', function() {
      cy.addBlog({ title: 'Github', author: 'github', url: 'www.github.com', likes: 13 })
      cy.visit('http://localhost:3000')

      cy.get('.blog-container').eq(0).should('contain','Github')
      cy.get('.blog-container').eq(1).should('contain','Full Stack Open')
      cy.get('.blog-container').eq(2).should('contain','Administrator Blog')

      cy.get('.visibleButton').eq(2).click()

      for (let i = 0; i < 4; i++) {
        cy.get('.like-button').click()
        cy.contains(`likes ${4+i}`)
      }

      cy.get('.blog-container').eq(0).should('contain','Github')
      cy.get('.blog-container').eq(1).should('contain', 'Administrator Blog')
      cy.get('.blog-container').eq(2).should('contain', 'Full Stack Open')
    })

  })
})