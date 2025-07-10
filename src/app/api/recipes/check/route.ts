import { NextResponse } from "next/server";
import { decrementIngredientQuantity } from "@/features/ingredients/actions";
import { getIngredientsByNames } from "@/features/ingredients/queries";
import type { Recipe } from "@/features/recipes/schemas/recipe.schema";
import prisma from "@/lib/db";
import { RecipeCheckRequestSchema } from "@/schemas";
import {
  getAllRecipes,
  updateRecipeDiscovered,
} from "@/server/db/queries/recipes";
import * as craftingService from "@/server/services/crafting-services";

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

    await tx.craftingAttempt.create({
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
    await tx.craftingAttempt.create({
      data: {
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
    const validation = craftingService.validateIngredients(
      ingredientNames,
      ingredients,
    );

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: validation.errorMessage,
        },
        { status: 400 },
      );
    }

    const recipes = await getAllRecipes();
    const matchingRecipe = craftingService.findMatchingRecipe(
      ingredientNames,
      recipes,
    );

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
