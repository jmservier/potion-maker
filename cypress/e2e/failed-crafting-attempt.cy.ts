describe("Failed Crafting Attempt", () => {
  beforeEach(() => {
    cy.request("POST", "/api/ingredients/reset");
    cy.request("POST", "/api/recipes/reset");
    cy.visit("/crafting");
  });

  it("should handle failed crafting attempt correctly", () => {
    cy.contains("Crafting Potions").should("be.visible");
    cy.contains("Cauldron").should("be.visible");

    // Select invalid recipe
    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();

    cy.get(".rounded-full").should("contain", "Argent");
    cy.get(".rounded-full").should("contain", "Noix de coco");
    cy.get(".rounded-full").should("contain", "Yttrium");
    cy.contains("3/3 ingredients selected").should("be.visible");

    // Store initial quantities
    let initialArgentQuantity: number;
    let initialCoconutQuantity: number;
    let initialYttriumQuantity: number;
    cy.contains("Argent")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        initialArgentQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
      });

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

    cy.contains("Brew Potion").click();

    // Failure notification
    cy.contains("No recipe found with these ingredients").should("be.visible");

    // Ingredients consumed even on failure
    cy.contains("Argent")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.match(/\d+/)?.[0] || "0");
        expect(newQuantity).to.equal(initialArgentQuantity - 1);
      });

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

    // Cauldron resets
    cy.contains("0/3 ingredients selected").should("be.visible");
    cy.contains("Select 3 ingredients").should("be.visible");

    // No new recipe discovered
    cy.get("body").should("not.contain", "New recipe discovered");
  });

  it("should handle multiple failed attempts correctly", () => {
    cy.visit("/crafting");

    // First failed attempt
    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();
    cy.contains("Brew Potion").click();
    cy.contains("No recipe found with these ingredients").should("be.visible");

    // Second failed attempt
    cy.contains("Bave de lama").click();
    cy.contains("Épine de hérisson").click();
    cy.contains("Or").click();
    cy.contains("Brew Potion").click();
    cy.contains("No recipe found with these ingredients").should("be.visible");

    // Both attempts consumed ingredients
    cy.contains("Argent")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .should("match", /Qty: [0-9]+/);

    cy.contains("Bave de lama")
      .closest(".cursor-pointer")
      .contains(/Qty: \d+/)
      .invoke("text")
      .should("match", /Qty: [0-9]+/);
  });

  it("should prevent crafting with insufficient ingredients", () => {
    cy.visit("/crafting");
    cy.intercept("POST", "/api/recipes/check").as("brewRequest");

    let initialQuantity: number;
    cy.get('h3:contains("Argent")').parent().parent().as("argentCard");

    cy.get("@argentCard")
      .contains(/Qty: \d+/)
      .invoke("text")
      .then((text) => {
        initialQuantity = parseInt(text.match(/\d+/)?.[0] || "0");

        // Exhaust ingredient by crafting multiple times
        for (let i = 0; i < initialQuantity; i++) {
          cy.contains("Argent").click();
          cy.contains("Noix de coco").click();
          cy.contains("Yttrium").click();
          cy.contains("Brew Potion").click();
          cy.wait("@brewRequest");
          cy.contains("0/3 ingredients selected").should("be.visible");
        }

        // Ingredient now out of stock
        cy.get("@argentCard")
          .should("contain", "Out of Stock")
          .should("have.class", "cursor-not-allowed");

        // Out of stock ingredient not selectable
        cy.contains("Argent").click();
        cy.contains("0/3 ingredients selected").should("be.visible");
      });
  });
});
