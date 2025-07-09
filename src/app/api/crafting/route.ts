import { NextResponse } from "next/server";
import { CraftingAttemptSchema } from "@/schemas";
import { getAllCraftingAttempts } from "@/server/db/queries/crafting";

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
