import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { RecipeSchema } from "@/shared/schemas";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
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
