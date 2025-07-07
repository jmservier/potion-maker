"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Ingredient } from "@prisma/client";

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
          ? "opacity-50 cursor-not-allowed bg-gray-900/50 border-gray-700"
          : `cursor-pointer hover:scale-105 ${
              isSelected
                ? "bg-amber-500/50 border-amber-400 ring-2 ring-amber-400"
                : "bg-gray-800/50 border-gray-600/50 hover:border-amber-400/50"
            }`
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="text-3xl mb-2">🔮</div>
        <h3
          className={`font-semibold text-sm mb-1 ${
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
