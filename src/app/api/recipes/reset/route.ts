import { NextResponse } from "next/server";
import { resetAllRecipes } from "@/server/db/queries/recipes";

export async function POST() {
  try {
    await resetAllRecipes();

    return NextResponse.json({
      success: true,
      message: "Recipes reset",
    });
  } catch (error) {
    console.error("Failed to reset recipes", error);
    return NextResponse.json(
      { error: "Failed to reset recipes" },
      { status: 500 },
    );
  }
}
