describe('Check main page', () => {
  it('Check inputs', () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[id=addTrack]").should("be.visible")
    cy.get("input[id=filterTrack]").should("be.visible")
  })

  it('Wait for content', () => {
    cy.wait(1100);  // content loads after 1 sec, so it waits 1.1 sec
    cy.get("div[class=tracks__track]").should("be.visible")
  })

  it('Check filter', () => {
    cy.get("input[id=filterTrack]").type("House")
    cy.get("div[class=tracks__track]").within(() => {
      cy.get('li').should('contain', 'House')
    })
    cy.get("input[id=filterTrack]").clear()
  })

  it('Check add track', () => {
    cy.get("input[id=addTrack]").type("TestTrack")
    cy.get("div[class=navbar__element] button[id=addTrack]").click()
    cy.get("ul[class=tracks__list] div:last-child").within(() => {
      cy.get('a li').should('contain', 'TestTrack')
    })
  })

  it('Check delete track', () => {
    cy.get("ul[class=tracks__list] div:last-child").within(() => {
      cy.get('a li').should('contain', 'TestTrack')
      cy.get("div[class=tracks__delete] button").click()
    })
    cy.get("ul[class=tracks__list] div:last-child").within(() => {
      cy.get('a li').should('not.contain', 'TestTrack')
    })
  })
})