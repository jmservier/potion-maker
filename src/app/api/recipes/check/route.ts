import { NextResponse } from "next/server";
import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import type { Recipe } from "@/features/recipes/schemas/recipe.schema";
import { RecipeCheckRequestSchema } from "@/schemas";
import prisma from "@/server/db/client";
import { createPotion } from "@/server/db/queries/crafting";
import {
  decrementIngredientQuantity,
  getIngredientsByNames,
} from "@/server/db/queries/ingredients";
import {
  getAllRecipes,
  updateRecipeDiscovered,
} from "@/server/db/queries/recipes";

async function validateIngredients(
  ingredientNames: string[],
  ingredients: Ingredient[],
): Promise<{ isValid: boolean; errorResponse?: NextResponse }> {
  for (const ingredientName of ingredientNames) {
    const ingredient = ingredients.find((i) => i.name === ingredientName);
    if (!ingredient) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            message: `Ingredient "${ingredientName}" not found in inventory`,
          },
          { status: 400 },
        ),
      };
    }
    if (ingredient.quantity <= 0) {
      return {
        isValid: false,
        errorResponse: NextResponse.json(
          {
            success: false,
            message: `Not enough "${ingredientName}" in inventory`,
          },
          { status: 400 },
        ),
      };
    }
  }
  return { isValid: true };
}

function findMatchingRecipe(
  ingredientNames: string[],
  recipes: Recipe[],
): Recipe | undefined {
  const sortedIngredients = ingredientNames.sort();
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

async function processSuccessfulRecipe(
  matchingRecipe: Recipe,
  ingredientNames: string[],
): Promise<NextResponse> {
  await prisma.$transaction(async (tx) => {
    if (!matchingRecipe.discovered) {
      await updateRecipeDiscovered(matchingRecipe.id);
    }

    for (const ingredientName of ingredientNames) {
      await decrementIngredientQuantity(ingredientName);
    }

    await tx.potion.create({
      data: {
        recipeName: matchingRecipe.name,
        success: true,
      },
    });
  });

  return NextResponse.json({
    success: true,
    recipe: {
      id: matchingRecipe.id,
      name: matchingRecipe.name,
      ingredients: matchingRecipe.ingredients,
    },
    message: `Success! Created ${matchingRecipe.name}!`,
  });
}

async function processFailedRecipe(
  ingredientNames: string[],
): Promise<NextResponse> {
  await prisma.$transaction(async (tx) => {
    for (const ingredientName of ingredientNames) {
      await decrementIngredientQuantity(ingredientName);
    }
    await createPotion(ingredientNames.join(", "), false);
    await tx.potion.create({
      data: {
        recipeName: `Failed attempt: ${ingredientNames.join(", ")}`,
        success: false,
      },
    });
  });

  return NextResponse.json({
    success: false,
    message: "Recipe not found. Ingredients consumed in failed attempt.",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parseResult = RecipeCheckRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { ingredientNames } = parseResult.data;

    const ingredients = await getIngredientsByNames(ingredientNames);
    const validation = await validateIngredients(ingredientNames, ingredients);

    if (!validation.isValid) {
      return validation.errorResponse!;
    }

    const recipes = await getAllRecipes();
    const matchingRecipe = findMatchingRecipe(ingredientNames, recipes);

    if (matchingRecipe) {
      return await processSuccessfulRecipe(matchingRecipe, ingredientNames);
    } else {
      return await processFailedRecipe(ingredientNames);
    }
  } catch (error) {
    console.error("Error in recipe check:", error);
    return NextResponse.json(
      { error: "Error checking recipe" },
      { status: 500 },
    );
  }
}
