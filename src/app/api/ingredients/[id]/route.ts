import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { id: params.id },
    });

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(ingredient);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ingredient" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name, quantity } = body;

    const ingredient = await prisma.ingredient.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(quantity !== undefined && { quantity }),
      },
    });

    return NextResponse.json(ingredient);
  } catch (error) {
    if (error instanceof Error && error.message.includes("P2025")) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }
    if (error instanceof Error && error.message.includes("P2002")) {
      return NextResponse.json(
        { error: "Ingredient name already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to update ingredient" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.ingredient.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    if (error instanceof Error && error.message.includes("P2025")) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: "Failed to delete ingredient" },
      { status: 500 },
    );
  }
}
