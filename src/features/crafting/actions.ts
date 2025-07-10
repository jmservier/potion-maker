"use server";

import { decrementIngredientQuantity } from "@/features/ingredients/actions";
import { getIngredientsByNames } from "@/features/ingredients/queries";
import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import { updateRecipeDiscovered } from "@/features/recipes/actions";
import { getAllRecipes } from "@/features/recipes/queries";
import type { Recipe } from "@/features/recipes/schemas/recipe.schema";
import prisma from "@/lib/db";

function validateIngredients(
  ingredientNames: string[],
  ingredients: Ingredient[],
): { isValid: boolean; errorMessage?: string } {
  for (const ingredientName of ingredientNames) {
    const ingredient = ingredients.find((i) => i.name === ingredientName);
    if (!ingredient) {
      return {
        isValid: false,
        errorMessage: `Ingredient "${ingredientName}" not found in inventory`,
      };
    }
    if (ingredient.quantity <= 0) {
      return {
        isValid: false,
        errorMessage: `Not enough "${ingredientName}" in inventory`,
      };
    }
  }
  return { isValid: true };
}

function findMatchingRecipe(
  ingredientNames: string[],
  recipes: Recipe[],
): Recipe | undefined {
  const sortedIngredients = [...ingredientNames].sort();
  return recipes.find((recipe) => {
    const recipeIngredients = recipe.ingredients;
    const sortedRecipeIngredients = [...recipeIngredients].sort();

    return (
      sortedIngredients.length === sortedRecipeIngredients.length &&
      sortedIngredients.every(
        (ingredient, index) => ingredient === sortedRecipeIngredients[index],
      )
    );
  });
}

export async function checkRecipeAndCraft(ingredientNames: string[]) {
  try {
    const ingredients = await getIngredientsByNames(ingredientNames);
    const validation = validateIngredients(ingredientNames, ingredients);

    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errorMessage,
      };
    }

    const recipes = await getAllRecipes();
    const matchingRecipe = findMatchingRecipe(ingredientNames, recipes);

    if (matchingRecipe) {
      await prisma.$transaction(async (tx) => {
        if (!matchingRecipe.discovered) {
          await updateRecipeDiscovered(matchingRecipe.id);
        }

        for (const ingredientName of ingredientNames) {
          await decrementIngredientQuantity(ingredientName);
        }

        await tx.craftingAttempt.create({
          data: {
            recipeName: matchingRecipe.name,
            success: true,
          },
        });
      });

      return {
        success: true,
        recipe: {
          id: matchingRecipe.id,
          name: matchingRecipe.name,
          ingredients: matchingRecipe.ingredients,
        },
        message: `Success! Created ${matchingRecipe.name}!`,
      };
    } else {
      await prisma.$transaction(async (tx) => {
        for (const ingredientName of ingredientNames) {
          await decrementIngredientQuantity(ingredientName);
        }
        await tx.craftingAttempt.create({
          data: {
            success: false,
          },
        });
      });

      return {
        success: false,
        message: "Recipe not found. Ingredients consumed in failed attempt.",
      };
    }
  } catch (error) {
    console.error("Error in recipe check:", error);
    throw new Error("Error checking recipe");
  }
}
