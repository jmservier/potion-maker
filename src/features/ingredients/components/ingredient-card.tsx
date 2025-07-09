"use client";

import Image from "next/image";
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
  console.log(" ingredient-card.tsx:18 ingredient:", ingredient);
  const isOutOfStock = ingredient.quantity <= 0;

  return (
    <Card
      onClick={isOutOfStock ? undefined : onClick}
      className={`cursor-pointer overflow-hidden py-0 ${
        isOutOfStock ? "cursor-not-allowed opacity-50" : ""
      }`}
      style={{
        background: isSelected
          ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(222, 184, 135, 0.2) 100%)"
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 240, 0.8) 100%)",
        border: isSelected
          ? "1px solid rgba(160, 82, 45, 0.4)"
          : "1px solid rgba(210, 180, 140, 0.4)",
        transition: "all 0.3s ease",
        boxShadow: isSelected
          ? "0 2px 10px rgba(160, 82, 45, 0.2)"
          : "0 2px 8px rgba(210, 180, 140, 0.1)",
      }}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src="https://i.ibb.co/B2HQXmSm/Screenshot-2025-07-09-at-01-26-55.png"
            alt={ingredient.name}
            width={200}
            height={120}
            priority={false}
          />
          <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-sm font-bold" style={{ color: "#3d2914" }}>
              {ingredient.quantity}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-base font-bold" style={{ color: "#3d2914" }}>
            {ingredient.name}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "#8b4513" }}>
            {ingredient.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
