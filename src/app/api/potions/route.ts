import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const potions = await prisma.potion.findMany();
    return NextResponse.json(potions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch potions" },
      { status: 500 },
    );
  }
}
