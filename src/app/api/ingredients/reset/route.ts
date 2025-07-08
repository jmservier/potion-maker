import { NextResponse } from "next/server";
import { ResetInventoryResponseSchema } from "@/schemas";
import { resetAllIngredientQuantities } from "@/server/db/queries/ingredients";

export async function POST() {
  try {
    await resetAllIngredientQuantities();

    const response = ResetInventoryResponseSchema.parse({
      message: "Inventory reset to 10 for all ingredients.",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to reset inventory", error);
    return NextResponse.json(
      { error: "Failed to reset inventory." },
      { status: 500 },
    );
  }
}
