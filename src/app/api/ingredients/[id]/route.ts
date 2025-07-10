import { NextResponse } from "next/server";
import {
  deleteIngredient,
  updateIngredient,
} from "@/features/ingredients/actions";
import { getIngredientById } from "@/features/ingredients/queries";
import {
  IngredientIdParamsSchema,
  IngredientSchema,
  UpdateIngredientRequestSchema,
} from "@/schemas";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const parseResult = IngredientIdParamsSchema.safeParse(resolvedParams);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { id } = parseResult.data;

    const ingredient = await getIngredientById(id);

    if (!ingredient) {
      return NextResponse.json(
        { error: "Ingredient not found" },
        { status: 404 },
      );
    }

    const validatedIngredient = IngredientSchema.parse(ingredient);
    return NextResponse.json(validatedIngredient);
  } catch (error) {
    console.error("Failed to fetch ingredient", error);
    return NextResponse.json(
      { error: "Failed to fetch ingredient" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const paramsResult = IngredientIdParamsSchema.safeParse(resolvedParams);

    if (!paramsResult.success) {
      return NextResponse.json(
        { error: paramsResult.error.errors },
        { status: 400 },
      );
    }

    const body = await request.json();
    const parseResult = UpdateIngredientRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { id } = paramsResult.data;
    const { name, quantity } = parseResult.data;

    const data: { name?: string; quantity?: number } = {};
    if (name !== undefined) data.name = name;
    if (quantity !== undefined) data.quantity = quantity;

    const ingredient = await updateIngredient(id, data);

    const validatedIngredient = IngredientSchema.parse(ingredient);
    return NextResponse.json(validatedIngredient);
  } catch (error) {
    console.error("Failed to update ingredient", error);
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
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const parseResult = IngredientIdParamsSchema.safeParse(resolvedParams);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { id } = parseResult.data;

    await deleteIngredient(id);

    return NextResponse.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    console.error("Failed to delete ingredient", error);
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
