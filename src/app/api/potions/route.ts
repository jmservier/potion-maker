import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const potions = await prisma.potion.findMany();
    return NextResponse.json(potions);
  } catch (error) {
    console.error("Failed to fetch potions", error);
    return NextResponse.json(
      { error: "Failed to fetch potions" },
      { status: 500 },
    );
  }
}
