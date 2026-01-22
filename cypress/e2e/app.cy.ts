describe('check working', () => {
  it('should navigate to login and login', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('a[href*="login"]').click()
 
    // The new url should include "/about"
    cy.url().should('include', '/login')
 
    // The new page should contain an h1 with "About", this is example only
    //cy.get('h1').contains('login')

    cy.get('input[type="email"]')
      .type("zuranmateo@gmail.com");

    cy.get('input[type="password"]')
      .type("123");

    cy.get('button[type="submit"][name="login"]')
      .click();

    cy.get('button[type="submit"][name="logout"]').should("exist");

    cy.get('button[type="submit"][name="logout"]').click();

    cy.getCookie("next-auth.session-token").should("not.exist");

    cy.get('a[href*="login"]').click()

    
  })
})