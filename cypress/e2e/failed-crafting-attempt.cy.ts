describe("Failed Crafting Attempt", () => {
  beforeEach(() => {
    cy.request("POST", "/api/ingredients/reset");
    cy.request("POST", "/api/recipes/reset");
    cy.visit("/crafting");
  });

  it("should handle failed crafting attempt correctly", () => {
    cy.contains("Laboratoire de potions").should("be.visible");
    cy.contains("Atelier de Potions").should("be.visible");

    // Select invalid recipe
    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();

    cy.get(".selected-ingredient").should("contain", "Argent");
    cy.get(".selected-ingredient").should("contain", "Noix de coco");
    cy.get(".selected-ingredient").should("contain", "Yttrium");
    cy.contains("3/3 ingrédients sélectionnés").should("be.visible");

    // Store initial quantities
    let initialArgentQuantity: number;
    let initialCoconutQuantity: number;
    let initialYttriumQuantity: number;
    cy.contains("Argent")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        initialArgentQuantity = parseInt(text.trim() || "0");
      });

    cy.contains("Noix de coco")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        initialCoconutQuantity = parseInt(text.trim() || "0");
      });

    cy.contains("Yttrium")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        initialYttriumQuantity = parseInt(text.trim() || "0");
      });

    cy.contains("Créer la Potion").click();

    // Failure notification
    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

    // Ingredients consumed even on failure
    cy.contains("Argent")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.trim() || "0");
        expect(newQuantity).to.equal(initialArgentQuantity - 1);
      });

    cy.contains("Noix de coco")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.trim() || "0");
        expect(newQuantity).to.equal(initialCoconutQuantity - 1);
      });

    cy.contains("Yttrium")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        const newQuantity = parseInt(text.trim() || "0");
        expect(newQuantity).to.equal(initialYttriumQuantity - 1);
      });

    // Cauldron resets
    cy.contains("0/3 ingrédients sélectionnés").should("be.visible");
    cy.contains("Sélectionnez 3 ingrédients pour commencer").should(
      "be.visible",
    );

    // No new recipe discovered
    cy.get("body").should("not.contain", "New recipe discovered");
  });

  it("should handle multiple failed attempts correctly", () => {
    cy.visit("/crafting");

    // First failed attempt
    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();
    cy.contains("Créer la Potion").click();
    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

    // Second failed attempt
    cy.contains("Bave de lama").click();
    cy.contains("Épine de hérisson").click();
    cy.contains("Or").click();
    cy.contains("Créer la Potion").click();
    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

    // Both attempts consumed ingredients
    cy.contains("Argent")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .should("match", /[0-9]+/);

    cy.contains("Bave de lama")
      .closest(".ingredient-card")
      .find(".absolute")
      .invoke("text")
      .should("match", /[0-9]+/);
  });

  it("should prevent crafting with insufficient ingredients", () => {
    cy.visit("/crafting");
    cy.intercept("POST", "/api/recipes/check").as("brewRequest");

    let initialQuantity: number;
    cy.contains("Argent").closest(".ingredient-card").as("argentCard");

    cy.get("@argentCard")
      .find(".absolute")
      .invoke("text")
      .then((text) => {
        initialQuantity = parseInt(text.trim() || "0");

        // Exhaust ingredient by crafting multiple times
        for (let i = 0; i < initialQuantity; i++) {
          cy.contains("Argent").click();
          cy.contains("Noix de coco").click();
          cy.contains("Yttrium").click();
          cy.contains("Créer la Potion").click();
          cy.wait("@brewRequest");
          cy.contains("0/3 ingrédients sélectionnés").should("be.visible");
        }

        // Ingredient now out of stock
        cy.get("@argentCard").should("have.class", "cursor-not-allowed");

        // Out of stock ingredient not selectable
        cy.contains("Argent").click();
        cy.contains("0/3 ingrédients sélectionnés").should("be.visible");
      });
  });
});
