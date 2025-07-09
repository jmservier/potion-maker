import { describe, expect, it } from "@jest/globals";
import { mockIngredients, mockRecipes } from "../__mocks__/data";
import * as craftingService from "./crafting-services";

describe("Crafting Service", () => {
  describe("validateIngredients", () => {
    it("should return valid when all ingredients exist and have sufficient quantity", () => {
      const ingredientNames = ["Noix de coco", "Yttrium", "Mandragore"];
      const ingredients = [
        mockIngredients[11],
        mockIngredients[12],
        mockIngredients[13],
      ];

      const result = craftingService.validateIngredients(
        ingredientNames,
        ingredients,
      );

      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it("should return error when ingredient is not found in inventory", () => {
      const ingredientNames = ["Noix de coco", "Ingrédient Inexistant"];
      const ingredients = [mockIngredients[11]];

      const result = craftingService.validateIngredients(
        ingredientNames,
        ingredients,
      );

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Ingredient "Ingrédient Inexistant" not found in inventory',
      );
    });

    it("should return error when ingredient has zero quantity", () => {
      const zeroQuantityIngredient = { ...mockIngredients[0], quantity: 0 };
      const ingredientNames = [zeroQuantityIngredient.name];
      const ingredients = [zeroQuantityIngredient];

      const result = craftingService.validateIngredients(
        ingredientNames,
        ingredients,
      );

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        `Not enough "${zeroQuantityIngredient.name}" in inventory`,
      );
    });

    it("should validate empty ingredient list as valid", () => {
      const result = craftingService.validateIngredients([], []);

      expect(result.isValid).toBe(true);
      expect(result.errorMessage).toBeUndefined();
    });

    it("should return error for the first invalid ingredient when multiple are invalid", () => {
      const ingredientNames = ["Inexistant1", "Inexistant2"];
      const ingredients: typeof mockIngredients = [];

      const result = craftingService.validateIngredients(
        ingredientNames,
        ingredients,
      );

      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe(
        'Ingredient "Inexistant1" not found in inventory',
      );
    });
  });

  describe("findMatchingRecipe", () => {
    it("should return the correct recipe when ingredients match exactly", () => {
      const ingredientNames = ["Noix de coco", "Yttrium", "Mandragore"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeDefined();
      expect(recipe?.name).toBe("Potion d'invisibilité");
      expect(recipe?.ingredients).toEqual([
        "Noix de coco",
        "Yttrium",
        "Mandragore",
      ]);
    });

    it("should return the correct recipe when ingredients are in different order", () => {
      const ingredientNames = ["Mandragore", "Noix de coco", "Yttrium"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeDefined();
      expect(recipe?.name).toBe("Potion d'invisibilité");
    });

    it("should return undefined if no recipe matches", () => {
      const ingredientNames = ["Noix de coco"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeUndefined();
    });

    it("should return undefined if extra ingredients are provided", () => {
      const ingredientNames = [
        "Noix de coco",
        "Yttrium",
        "Mandragore",
        "Argent",
      ];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeUndefined();
    });

    it("should return undefined if fewer ingredients are provided", () => {
      const ingredientNames = ["Noix de coco", "Yttrium"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeUndefined();
    });

    it("should handle three-ingredient recipes correctly", () => {
      const ingredientNames = ["Poil de yéti", "Or", "Argent"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeDefined();
      expect(recipe?.name).toBe("Potion de Force");
    });

    it("should return undefined for empty ingredient list", () => {
      const recipe = craftingService.findMatchingRecipe([], mockRecipes);

      expect(recipe).toBeUndefined();
    });

    it("should handle case-sensitive ingredient names", () => {
      const ingredientNames = ["noix de coco", "yttrium", "mandragore"];

      const recipe = craftingService.findMatchingRecipe(
        ingredientNames,
        mockRecipes,
      );

      expect(recipe).toBeUndefined(); // case sensitivity check
    });

    it("should not modify the input arrays", () => {
      const ingredientNames = ["Mandragore", "Noix de coco", "Yttrium"];
      const originalOrder = [...ingredientNames];

      craftingService.findMatchingRecipe(ingredientNames, mockRecipes);

      expect(ingredientNames).toEqual(originalOrder);
    });
  });
});
