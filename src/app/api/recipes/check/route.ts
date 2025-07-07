import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { ingredientNames } = await request.json();
    if (!Array.isArray(ingredientNames) || ingredientNames.length !== 3) {
      return NextResponse.json(
        { error: "3 ingredients required" },
        { status: 400 },
      );
    }
    const sortedIngredients = ingredientNames.sort();
    const recipes = await prisma.recipe.findMany();
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
      if (!matchingRecipe.discovered) {
        await prisma.recipe.update({
          where: { id: matchingRecipe.id },
          data: { discovered: true },
        });
      }
      return NextResponse.json({
        success: true,
        recipe: {
          id: matchingRecipe.id,
          name: matchingRecipe.name,
          ingredients: matchingRecipe.ingredients,
        },
        message: `success: ${matchingRecipe.name}!`,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "recipe not found",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: "error check recipe" }, { status: 500 });
  }
}
