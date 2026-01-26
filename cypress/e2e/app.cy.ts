describe('check working', () => {
  it('login', () => {
    it('debug api login', () => {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
        email: 'zuranmateo@gmail.com',
        password: '123',
      },
      failOnStatusCode: false,
    }).then((res) => {
      console.log('STATUS:', res.status)
      console.log('BODY:', res.body)
    })
  })
  })

  beforeEach(() => {
    cy.login();
    //cy.session('user', () => cy.login())
  })

  it('update profile, logout', () => {
    console.log("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
    cy.location('pathname', { timeout: 20000 }).should('eq', '/');
    cy.visit('/user/editProfile/VsaoLp3zA4ILTjbG4Rh1xz');

    cy.get('input[name="username"]').clear().type('mateo');

    cy.get('button[name="editP"]').click();

    cy.visit('/user/editProfile/VsaoLp3zA4ILTjbG4Rh1xz')

    cy.get('input[name="username"]').clear().type('zuran mateo')

    cy.get('button[name="editP"]').click();
    

    cy.visit('/');

    cy.get('button[type="submit"][name="logout"]', {timeout: 10000}).should("exist");

    cy.get('button[type="submit"][name="logout"]').click();

    cy.getCookie("next-auth.session-token", {timeout: 10000}).should("not.exist");
  })
  it('open movies, press all buttons', () => {
    

    cy.get('a[href*="movies"]', {timeout: 20000}).click();

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

    cy.get('img:visible').each(($img) => {
  cy.wrap($img).should(($el) => {
    const img = $el[0] as HTMLImageElement
    expect(img.naturalWidth).to.be.greaterThan(0)
  })
})
  })
})

/**
 * cy.visit('/')
    
    cy.get('a[href*="login"]').click()
 
    // The new url should include "/about"
    cy.url({timeout: 10000}).should('include', '/login')
 
    // The new page should contain an h1 with "About", this is example only
    //cy.get('h1').contains('login')
    cy.intercept('GET', '/api/auth/session').as('session');
    cy.get('input[type="email"]')
      .type("zuranmateo@gmail.com");

    cy.get('input[type="password"]')
      .type("123");

    cy.get('button[type="submit"][name="login"]')
      .click();

    cy.wait('@session', { timeout: 20000 });

    cy.location('pathname', { timeout: 20000 }).should('eq', '/');
 */
/**
 * cy.visit('/')
    
    cy.get('a[href*="login"]').click()
 
    cy.url({timeout: 10000}).should('include', '/login')
 
    cy.get('input[type="email"]')
      .type("zuranmateo@gmail.com");

    cy.get('input[type="password"]')
      .type("123");

    cy.intercept('GET', '/api/auth/session').as('session');

    cy.get('button[type="submit"][name="login"]')
      .click();

    
    cy.wait('@session', { timeout: 20000 });

    cy.location('pathname', { timeout: 20000 }).should('eq', '/');
 */