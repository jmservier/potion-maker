import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getIngredientColor, getIngredientEmoji } from "@/lib/item-assets";
import { Ingredient } from "@/schemas";

interface InventoryIngredientCardProps {
  ingredient: Ingredient;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  isUpdating: boolean;
}

export function InventoryIngredientCard({
  ingredient,
  onUpdateQuantity,
  isUpdating,
}: InventoryIngredientCardProps) {
  const ingredientType = getIngredientColor(ingredient.name);
  const emoji = getIngredientEmoji(ingredient.name);

  return (
    <Card
      className="ingredient-card cursor-default overflow-hidden py-0"
      data-type={ingredientType}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="ingredient-emoji-container">
            <span className="ingredient-emoji">{emoji}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-base font-bold">{ingredient.name}</h3>
          <p className="text-brown mb-4 min-h-[2.5rem] text-xs leading-relaxed">
            {ingredient.description}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onUpdateQuantity(
                  ingredient.id,
                  Math.max(0, ingredient.quantity - 1),
                )
              }
              disabled={ingredient.quantity <= 0 || isUpdating}
              className="border-brown/20 hover:bg-brown/5 h-9 w-9 rounded-lg p-0 font-bold"
            >
              <Minus size={16} />
            </Button>

            <div className="flex items-center rounded-lg bg-gray-100/60 px-3 py-1.5 text-center font-bold">
              {ingredient.quantity}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onUpdateQuantity(ingredient.id, ingredient.quantity + 1)
              }
              disabled={isUpdating}
              className="border-brown/20 hover:bg-brown/5 h-9 w-9 rounded-lg p-0 font-bold"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
