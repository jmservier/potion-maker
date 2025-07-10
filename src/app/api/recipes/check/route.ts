import { NextResponse } from "next/server";
import { checkRecipeAndCraft } from "@/features/crafting/actions";
import { RecipeCheckRequestSchema } from "@/schemas";

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
    const result = await checkRecipeAndCraft(ingredientNames);

    // Return 200 for both success and failure - failed recipes are a valid game outcome, not an error
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in recipe check:", error);
    return NextResponse.json(
      { error: "Error checking recipe" },
      { status: 500 },
    );
  }
}
