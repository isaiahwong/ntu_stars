describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://wish.wis.ntu.edu.sg/pls/webexe/ldap_login.login?w_url=https://wish.wis.ntu.edu.sg/pls/webexe/aus_stars_planner.main')
    cy.get('[name="UID"]').type(Cypress.env('USER'))
    cy.get('[value="OK"]').click()
    cy.get('[type="password"][name="PW"]').type(Cypress.env('PASSWORD'))
    cy.get('[value="OK"]').click()
    cy.wait(1000)

    cy.on('uncaught:exception', (err, runnable) => {

      // using mocha's async done callback to finish
      // this test so we prove that an uncaught exception
      // was thrown
      done()
      cy.reload()
      // return false to prevent the error from
      // failing this test
      return false
    })

    for (let i = 0; i < 5000; i++) {

      cy.wait(300)
      if (i % 50 === 0) {
        cy.reload()
      }

      cy.get("body").then($body => {
        cy.wait(50)
        if ($body.find('[value="Add (Register) Selected Course(s)"]').length > 0)
          cy.get('[value="Add (Register) Selected Course(s)"]').click()

        cy.wait(110)
        if ($body.find('[value="Confirm to add course(s)"]').length > 0)
          cy.get('[value="Confirm to add course(s)"]').click()

        if ($body.find('[value="Back to Timetable"]').length > 0)
          cy.get('[value="Back to Timetable"]').click()

      });
    }
  })
})