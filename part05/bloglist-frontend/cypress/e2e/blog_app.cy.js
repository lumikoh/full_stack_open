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
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('lumiko')
      cy.get('#password').type('testpw')
      cy.get('#login-button').click()

      cy.contains('Lumi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('lumiko')
      cy.get('#password').type('wrongpw')
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
      cy.addBlog({ title: 'Administrator Blog', author: 'Admin', url: 'www.random.org' })

      cy.login({ username: 'lumiko', password: 'testpw' })
      cy.addBlog({ title: 'Full Stack Open', author: 'lumi', url: 'www.fullstackopen.com' })
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
      cy.get('.visibleButton').eq(0).click()
      cy.get('.like-button').click()
      cy.contains('likes 1')
    })

  })
})