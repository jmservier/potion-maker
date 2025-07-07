"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Ingredient } from "@/schemas";

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onClick: () => void;
}

export function IngredientCard({
  ingredient,
  isSelected,
  onClick,
}: IngredientCardProps) {
  const isOutOfStock = ingredient.quantity <= 0;

  return (
    <Card
      onClick={isOutOfStock ? undefined : onClick}
      className={`transition-all duration-300 ${
        isOutOfStock
          ? "cursor-not-allowed border-gray-700 bg-gray-900/50 opacity-50"
          : `cursor-pointer hover:scale-105 ${
              isSelected
                ? "border-amber-400 bg-amber-500/50 ring-2 ring-amber-400"
                : "border-gray-600/50 bg-gray-800/50 hover:border-amber-400/50"
            }`
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="mb-2 text-3xl">🔮</div>
        <h3
          className={`mb-1 text-sm font-semibold ${
            isOutOfStock ? "text-gray-500" : "text-white"
          }`}
        >
          {ingredient.name}
        </h3>
        <p
          className={`text-xs ${
            isOutOfStock ? "text-red-400" : "text-gray-400"
          }`}
        >
          Qty: {ingredient.quantity}
          {isOutOfStock && " (Out of Stock)"}
        </p>
      </CardContent>
    </Card>
  );
}
