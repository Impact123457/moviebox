import React from "react";
import Home from "@/app/(root)/page";
import LoginPage from "@/app/(root)/login/page";

describe("<Home />", () => {
  it("renders", () => {
    cy.then(async () => {
      const Page = await Home()
      cy.mount(Page as React.ReactElement)
    })

    cy.get('h1').should('be.visible');
  })
})

describe("<LoginPage />", () => {
  it("renders email, password inputs and login button", () => {
    cy.mount(<LoginPage />)

    // preveri, da obstaja email input
    cy.get('input[type="email"]').should("exist")

    // preveri, da obstaja password input
    cy.get('input[type="password"]').should("exist")

    // preveri, da obstaja login button
    cy.get('button[name="login"]').should("exist")
    cy.get('button[name="login"]').should("contain.text", "Log In")
  })
})


describe("<RegisterPage />", () => {
  it("renders all input fields and the register button", () => {
     const RegisterPageMock = () => (
  <section className="signSection">
    <div className="signForm">
      <input placeholder="name" />
      <input placeholder="surname" />
      <input placeholder="username" />
      <input placeholder="email" />
      <input placeholder="password" />
      <button type="submit">Register</button>
    </div>
  </section>
)
cy.mount(<RegisterPageMock />)
  })
})




