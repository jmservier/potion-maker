import { NextResponse } from "next/server";
import { clearCraftingHistory } from "@/features/history/actions";

export async function POST() {
  try {
    await clearCraftingHistory();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear crafting history", error);
    return NextResponse.json(
      { error: "Failed to clear crafting history" },
      { status: 500 },
    );
  }
}
