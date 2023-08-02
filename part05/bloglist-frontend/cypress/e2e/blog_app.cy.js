describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Lumi Jääheimo',
      username: 'lumiko',
      password: 'testpw'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

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

      cy.contains('Lumi Jääheimo logged in')
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
      cy.login({ username: 'lumiko', password: 'testpw' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.title-input').type('A test blogpost')
      cy.get('.author-input').type('lumiko')
      cy.get('.url-input').type('www.google.com')
      cy.get('.create-button').click()

      cy.contains('A test blogpost lumiko')
    })
  })
})