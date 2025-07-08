describe("Successful Potion Crafting Flow", () => {
  beforeEach(() => {
    cy.request("POST", "/api/ingredients/reset");
    cy.request("POST", "/api/recipes/reset");
    cy.visit("/crafting");
  });

  it("should handle successful potion crafting correctly", () => {
    cy.intercept("POST", "/api/recipes/check").as("brewRequest");

    cy.contains("Crafting Potions").should("be.visible");
    cy.contains("Cauldron").should("be.visible");

    // Select valid recipe: Potion d'invisibilité
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();
    cy.contains("Mandragore").click();

    cy.get(".rounded-full").should("contain", "Noix de coco");
    cy.get(".rounded-full").should("contain", "Yttrium");
    cy.get(".rounded-full").should("contain", "Mandragore");
    cy.contains("3/3 ingredients selected").should("be.visible");

    // Store initial quantities
    let initialCoconutQuantity: number;
    let initialYttriumQuantity: number;
    let initialMandragoreQuantity: number;
    cy.contains("Noix de coco")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        initialCoconutQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
      });

    cy.contains("Yttrium")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        initialYttriumQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
      });

    cy.contains("Mandragore")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        initialMandragoreQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
      });

    cy.contains("Brew Potion").click();
    cy.wait("@brewRequest");

    // Success notification
    cy.contains("Recipe discovered: Potion d'invisibilité").should(
      "be.visible",
    );

    // Verify ingredients consumed
    cy.contains("Noix de coco")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
        expect(newQuantity).to.equal(initialCoconutQuantity - 1);
      });

    cy.contains("Yttrium")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
        expect(newQuantity).to.equal(initialYttriumQuantity - 1);
      });

    cy.contains("Mandragore")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
        expect(newQuantity).to.equal(initialMandragoreQuantity - 1);
      });

    // Cauldron resets
    cy.contains("0/3 ingredients selected").should("be.visible");
    cy.contains("Select 3 ingredients").should("be.visible");

    // Recipe appears as discovered
    cy.contains("Recipes").click();
    cy.contains("Potion d'invisibilité").should("be.visible");
    cy.contains("Potion d'invisibilité")
      .parent()
      .should("not.have.class", "opacity-50");
  });

  it("should handle multiple successful crafting attempts", () => {
    cy.intercept("POST", "/api/recipes/check").as("brewRequest");

    // First recipe: Potion d'invisibilité
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();
    cy.contains("Mandragore").click();
    cy.contains("Brew Potion").click();
    cy.wait("@brewRequest");
    cy.contains("Recipe discovered: Potion d'invisibilité").should(
      "be.visible",
    );

    // Second recipe: Potion d'amour
    cy.contains("Bave de lama").click();
    cy.contains("Plume de griffon").click();
    cy.contains("Hélium liquide").click();
    cy.contains("Brew Potion").click();
    cy.wait("@brewRequest");
    cy.contains("Recipe discovered: Potion d'amour").should("be.visible");

    // Both recipes discovered
    cy.contains("Recipes").click();
    cy.contains("Potion d'invisibilité").should("be.visible");
    cy.contains("Potion d'amour").should("be.visible");
  });
});
