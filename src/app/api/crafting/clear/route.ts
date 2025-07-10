import { NextResponse } from "next/server";
import prisma from "@/server/db/client";

export async function POST() {
  try {
    await prisma.craftingAttempt.deleteMany();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to clear crafting history", error);
    return NextResponse.json(
      { error: "Failed to clear crafting history" },
      { status: 500 },
    );
  }
}
