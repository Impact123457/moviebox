import { TIMEOUT } from "dns"

describe('check working', () => {
  it('login, update profile, logout', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('a[href*="login"]').click()
 
    // The new url should include "/about"
    cy.url({timeout: 10000}).should('include', '/login')
 
    // The new page should contain an h1 with "About", this is example only
    //cy.get('h1').contains('login')

    cy.get('input[type="email"]')
      .type("zuranmateo@gmail.com");

    cy.get('input[type="password"]')
      .type("123");

    cy.get('button[type="submit"][name="login"]')
      .click();

    cy.location('pathname', { timeout: 15000 }).should('eq', '/')

    cy.get('a[href*="movies"]', { timeout: 15000 }).should('be.visible')

    cy.visit('http://localhost:3000/user/editProfile/VsaoLp3zA4ILTjbG4Rh1xz?')

    cy.get('input[name="username"]').clear().type('mateo');

    cy.get('button[name="editP"]').click();

    cy.visit('http://localhost:3000/user/editProfile/VsaoLp3zA4ILTjbG4Rh1xz?')

    cy.get('input[name="username"]').clear().type('zuran mateo')

    cy.get('button[name="editP"]').click();
    

    cy.visit('http://localhost:3000/');

    cy.get('button[type="submit"][name="logout"]', {timeout: 10000}).should("exist");

    cy.get('button[type="submit"][name="logout"]').click();

    cy.getCookie("next-auth.session-token", {timeout: 10000}).should("not.exist");
  })

  it('login, open movies, press all buttons', () => {
    cy.visit('http://localhost:3000/')
    
    cy.get('a[href*="login"]').click()
 
    cy.url({timeout: 10000}).should('include', '/login')
 
    cy.get('input[type="email"]')
      .type("zuranmateo@gmail.com");

    cy.get('input[type="password"]')
      .type("123");

    cy.get('button[type="submit"][name="login"]')
      .click();

    cy.location('pathname', { timeout: 15000 }).should('eq', '/')

    cy.get('a[href*="movies"]', { timeout: 15000 }).should('be.visible')

    cy.get('a[href*="movies"]').click();

    cy.location('pathname', { timeout: 10000 })
    .should('eq', '/movies')

    cy.get('img:visible').each(($img) => {
  cy.wrap($img).should(($el) => {
    const img = $el[0] as HTMLImageElement
    expect(img.naturalWidth).to.be.greaterThan(0)
  })
})

    cy.get('input[name="query"]').type('star');

    cy.get('button[name="search"]').click();

    cy.get('img:visible').each(($img) => {
  cy.wrap($img).should(($el) => {
    const img = $el[0] as HTMLImageElement
    expect(img.naturalWidth).to.be.greaterThan(0)
  })
})


    cy.get('a[href^="/movie/"]').first().click();

    cy.url({timeout: 10000}).should('include', '/movie/');

    cy.get('img:visible').each(($img) => {
  cy.wrap($img).should(($el) => {
    const img = $el[0] as HTMLImageElement
    expect(img.naturalWidth).to.be.greaterThan(0)
  })
})



    cy.get('button[name="liked"]').click();

    cy.get('button[name="liked"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')

    cy.get('button[name="liked"]').click();

    cy.get('button[name="liked"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')


  cy.get('button[name="watched"]').click();

    cy.get('button[name="watched"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')

    cy.get('button[name="watched"]').click();

    cy.get('button[name="watched"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')



  cy.get('button[name="watchlist"]').click();

    cy.get('button[name="watchlist"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')

    cy.get('button[name="watchlist"]').click();

    cy.get('button[name="watchlist"] svg', { timeout: 10000 })
  .should('have.class', 'text-red-500')

    cy.visit('http://localhost:3000/user/VsaoLp3zA4ILTjbG4Rh1xz')


    cy.get('img:visible').each(($img) => {
  cy.wrap($img).should(($el) => {
    const img = $el[0] as HTMLImageElement
    expect(img.naturalWidth).to.be.greaterThan(0)
  })
})
  })
})