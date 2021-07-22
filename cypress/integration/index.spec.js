describe('Read-Only-Example', () => {

  it('Default State', () => {
    cy.visit('http://localhost:8080')
    cy.wait(2000)
    cy.get('tbody').children().should('have.length', 8)
  })

  it('Add New User', () => {
    cy.visit('http://localhost:8080')
    cy.get('#newUserBtn').click()
    cy.get('input[name="name"]').clear().type('Test Name')
    cy.get('select[name="state"]').select('Alaska')
    cy.get('input[name="age"]').clear().type(20)
    cy.get('#submitBtn').click()
    cy.wait(2000)
    cy.get('tbody').children().should('have.length', 9)
  })
})
