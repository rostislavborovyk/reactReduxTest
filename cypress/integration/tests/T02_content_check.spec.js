describe('Check main page', () => {
  it('Check inputs', () => {
    cy.visit("http://localhost:3000/");
    cy.get("input[id=addTrack]").should("be.visible")
    cy.get("input[id=filterTrack]").should("be.visible")
  })

  it('Wait for content', () => {
    cy.wait(1100);  // content loads after 1 sec, so it waits 1.1 sec
    cy.get("div[class=tracksContainer__element]").should("be.visible")
  })

  it('Check filter', () => {
    cy.get("input[id=filterTrack]").type("House")
    cy.get("div[class=tracksContainer__element]").within(() => {
      cy.get('a div').should('contain', 'House')
    })
    cy.get("input[id=filterTrack]").clear()

  })

  it('Check add track', () => {
    cy.get("input[id=addTrack]").type("TestTrack")
    cy.get("div[class=navbarContainer__input] button").click()
    cy.get("div[class=tracksContainer] div:last-child").within(() => {
      cy.get('a div[class=tracksContainer__track]').should('contain', 'TestTrack')
    })

  })
})