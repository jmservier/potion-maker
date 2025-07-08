import { NextResponse } from "next/server";
import { PotionSchema } from "@/schemas";
import { getAllPotions } from "@/server/db/queries/crafting";

export async function GET() {
  try {
    const potions = await getAllPotions();
    const validatedPotions = potions.map((potion) =>
      PotionSchema.parse(potion),
    );
    return NextResponse.json(validatedPotions);
  } catch (error) {
    console.error("Failed to fetch potions", error);
    return NextResponse.json(
      { error: "Failed to fetch potions" },
      { status: 500 },
    );
  }
}
