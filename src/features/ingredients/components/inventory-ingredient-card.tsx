import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  return (
    <Card className="ingredient-card rounded-t-lg py-0">
      <CardHeader className="p-0">
        <div className="relative h-40">
          <Image
            src="https://i.ibb.co/B2HQXmSm/Screenshot-2025-07-09-at-01-26-55.png"
            alt={ingredient.name}
            fill
            className="rounded-t-lg object-cover"
            priority={false}
          />
        </div>
        <div className="p-4 pb-2">
          <CardTitle className="text-lg font-bold">
            {ingredient.name}
          </CardTitle>
          <CardDescription className="text-sm">
            {ingredient.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              className="h-10 w-10 rounded-lg p-0 font-bold"
            >
              <Minus size={16} />
            </Button>

            <div className="min-w-[3rem] rounded-lg px-4 py-2 text-center font-bold">
              {ingredient.quantity}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                onUpdateQuantity(ingredient.id, ingredient.quantity + 1)
              }
              disabled={isUpdating}
              className="h-10 w-10 rounded-lg p-0 font-bold"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
