describe("Failed Crafting Attempt", () => {
  beforeEach(() => {
    cy.request("POST", "/api/ingredients/reset");
    cy.request("POST", "/api/recipes/reset");
    cy.visit("/crafting");
  });

  it("should handle failed crafting attempt correctly", () => {
    cy.contains("Laboratoire de potions").should("be.visible");
    cy.contains("Atelier de Potions").should("be.visible");

    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();

    // Wait for ingredients to appear in the potion mixer
    cy.get(".brewing-area").should("exist");
    cy.get(".selected-ingredient").should("have.length", 3);
    cy.get(".selected-ingredient").should("contain", "Argent");
    cy.get(".selected-ingredient").should("contain", "Noix de coco");
    cy.get(".selected-ingredient").should("contain", "Yttrium");
    cy.contains("3/3 ingrédients sélectionnés").should("be.visible");

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

    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

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

    cy.contains("0/3 ingrédients sélectionnés").should("be.visible");
    cy.contains("Sélectionnez 3 ingrédients pour commencer").should(
      "be.visible",
    );

    cy.get("body").should("not.contain", "New recipe discovered");
  });

  it("should handle multiple failed attempts correctly", () => {
    cy.visit("/crafting");

    cy.contains("Argent").click();
    cy.contains("Noix de coco").click();
    cy.contains("Yttrium").click();
    cy.contains("Créer la Potion").click();
    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

    cy.contains("Bave de lama").click();
    cy.contains("Épine de hérisson").click();
    cy.contains("Or").click();
    cy.contains("Créer la Potion").click();
    cy.contains("Aucune recette trouvée avec ces ingrédients").should(
      "be.visible",
    );

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
    cy.request("GET", "/api/ingredients").then((response) => {
      const argentIngredient = response.body.find(
        (ing: { name: string }) => ing.name === "Argent",
      );

      cy.request("PUT", `/api/ingredients/${argentIngredient.id}`, {
        quantity: 0,
      });

      cy.visit("/crafting");

      cy.contains("Argent").closest(".ingredient-card").as("argentCard");

      cy.get("@argentCard").find(".absolute").should("have.text", "0");

      cy.get("@argentCard").should("have.class", "cursor-not-allowed");
      cy.get("@argentCard").should("have.class", "opacity-50");

      cy.contains("Argent").click();

      cy.contains("0/3 ingrédients sélectionnés").should("be.visible");

      cy.contains("Noix de coco").click();
      cy.contains("Yttrium").click();

      cy.contains("2/3 ingrédients sélectionnés").should("be.visible");

      cy.get("button").contains("Créer la Potion").should("be.disabled");

      cy.contains("Argent").click();

      cy.contains("2/3 ingrédients sélectionnés").should("be.visible");
    });
  });
});
