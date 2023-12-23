describe("Home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.getByData("click-to-start").click();
  });

  context("Click to start", () => {
    it("click anywhere to start", () => {
      cy.getByData("click-to-start").should("not.exist");
    });

    it("click anywhere to play the background music", () => {
      cy.getByData("background-music").should("have.prop", "paused", false);
    });
  });

  context("Victory", () => {
    it("victory when no active cards left and click anywhere to restart", () => {
      cy.get('[data-role="bat"]').eq(0).click();
      cy.wait(1000);
      cy.get('[data-role="bat"]').eq(1).click();
      cy.wait(1000);
      cy.get('[data-role="bones"]').eq(0).click();
      cy.wait(1000);
      cy.get('[data-role="bones"]').eq(1).click();
      cy.wait(1000);
      cy.get('[data-role="cauldron"]').eq(0).click();
      cy.wait(1000);
      cy.get('[data-role="cauldron"]').eq(1).click();
      cy.get('[data-status="active"]').should("not.exist");
      cy.getByData("victory").should("exist");
      cy.wait(1000);
      cy.getByData("victory").click();
      cy.getByData("victory").should("not.exist");
      cy.getByData("flips").should("have.text", "0");
      cy.getByData("countdown").should("have.text", "60");
    });
  });

  context("Flips", () => {
    it("flips increase when click a card", () => {
      cy.getByData("card").eq(0).click();
      cy.wait(1000);
      cy.getByData("card").eq(1).click();
      cy.wait(1000);
      cy.getByData("flips").should("have.text", 2);
    });
  });

  context("Cards", () => {
    it.only("flip up/down card when click", () => {
      cy.getByData("card").eq(0).invoke("attr", "data-status").should("equal", "idle");
      cy.getByData("card").eq(0).click();
      cy.getByData("card").eq(0).invoke("attr", "data-status").should("equal", "active");
      cy.wait(1000);
      cy.getByData("card").eq(0).click();
      cy.getByData("card").eq(0).invoke("attr", "data-status").should("equal", "idle");
      cy.get('[data-status="active"]').should("not.exist");
    });

    it("max 2 active cards at the same time", () => {
      cy.getByData("card").eq(0).click();
      cy.wait(1000);
      cy.getByData("card").eq(1).click();
      cy.wait(1000);
      cy.get('[data-status="active"]').should("not.exist");
      cy.getByData("card").eq(0).click();
      cy.wait(1000);
      cy.getByData("card").eq(1).click();
      cy.wait(1000);
      cy.getByData("card").eq(2).click();
      cy.wait(1000);
      cy.get('[data-status="active"]').should("exist");
      cy.get('[data-status="active"]').should("have.length", 1);
    });

    it("disable 2 cards", () => {
      cy.get('[data-role="bat"]').eq(0).click();
      cy.wait(1000);
      cy.get('[data-role="bat"]').eq(1).click();
      cy.wait(1000);
      cy.get('[data-status="disabled"]').should("have.length", 2);
    });
  });

  context("Game over", () => {
    it("game over when countdown reach 0 and click anywhere to restart", () => {
      cy.wait(60000);
      cy.getByData("countdown").should("have.text", "0");
      cy.get('[data-status="active"], [data-status="idle"]').should(
        "have.length.greaterThan",
        0
      );
      cy.getByData("game-over").should("exist");
      cy.wait(1000);
      cy.getByData("game-over").click();
      cy.getByData("game-over").should("not.exist");
    });
  });
});
