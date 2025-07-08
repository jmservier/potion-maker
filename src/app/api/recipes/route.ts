import { NextResponse } from "next/server";
import { RecipeSchema } from "@/schemas";
import { getAllRecipes } from "@/server/db/queries/recipes";

export async function GET() {
  try {
    const recipes = await getAllRecipes();
    const validatedRecipes = recipes.map((recipe) =>
      RecipeSchema.parse(recipe),
    );
    return NextResponse.json(validatedRecipes);
  } catch (error) {
    console.error("Failed to fetch recipes", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
