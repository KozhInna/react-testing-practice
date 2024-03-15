describe("Navigate to Login and attempt login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get("button").contains("Countries").click();
  });

  it("Login title should be visible", () => {
    cy.get("h1").should("contain", "Login");
  });

  it("login with invalid credentials", () => {
    cy.get("input[placeholder='Email']").type("fff");
    cy.get("input[placeholder='Password']").type("ffff");
    cy.get('[data-id="login-button"]').click();
  });

  it("login with invalid credentials", () => {
    cy.get("input[placeholder='Email']").type("in@mail.com");
    cy.get("input[placeholder='Password']").type("inmailcom");
    cy.get('[data-id="login-button"]').click();
  });
});
