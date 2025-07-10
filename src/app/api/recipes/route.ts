import { NextResponse } from "next/server";
import { getAllRecipes } from "@/features/recipes/queries";
import { RecipeSchema } from "@/schemas";

export async function GET() {
  try {
    const recipes = await getAllRecipes();
    const validatedRecipes = recipes.map((recipe) =>
      RecipeSchema.parse(recipe),
    );

    return NextResponse.json(validatedRecipes, {
      headers: {
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to fetch recipes", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
