import { NextResponse } from "next/server";
import { getAllCraftingAttempts } from "@/features/history/queries";
import { CraftingAttemptSchema } from "@/schemas";

export async function GET() {
  try {
    const attempts = await getAllCraftingAttempts();
    const validatedAttempts = attempts.map((attempt) =>
      CraftingAttemptSchema.parse(attempt),
    );
    return NextResponse.json(validatedAttempts);
  } catch (error) {
    console.error("Failed to fetch crafting attempts", error);
    return NextResponse.json(
      { error: "Failed to fetch crafting attempts" },
      { status: 500 },
    );
  }
}
