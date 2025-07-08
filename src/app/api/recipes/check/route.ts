import { NextResponse } from "next/server";
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

    for (const ingredientName of ingredientNames) {
      const ingredient = ingredients.find((i) => i.name === ingredientName);
      if (!ingredient) {
        return NextResponse.json(
          {
            success: false,
            message: `Ingredient "${ingredientName}" not found in inventory`,
          },
          { status: 400 },
        );
      }
      if (ingredient.quantity <= 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Not enough "${ingredientName}" in inventory`,
          },
          { status: 400 },
        );
      }
    }

    const sortedIngredients = ingredientNames.sort();
    const recipes = await getAllRecipes();
    const matchingRecipe = recipes.find((recipe) => {
      const recipeIngredients = recipe.ingredients as string[];
      const sortedRecipeIngredients = [...recipeIngredients].sort();

      return (
        sortedIngredients.length === sortedRecipeIngredients.length &&
        sortedIngredients.every(
          (ingredient, index) => ingredient === sortedRecipeIngredients[index],
        )
      );
    });

    if (matchingRecipe) {
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
    } else {
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
  } catch (error) {
    console.error("Error in recipe check:", error);
    return NextResponse.json(
      { error: "Error checking recipe" },
      { status: 500 },
    );
  }
}
