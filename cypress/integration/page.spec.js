describe('Load page', () => {
    it('should load the page components', () => {
        cy.visit('/')
        cy.get('[data-cy=product]').should('be.visible')

        cy.get('[data-cy=navbar]').should('be.visible')
    })
})