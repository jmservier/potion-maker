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
    <Card
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 240, 0.8) 100%)",
        border: "1px solid rgba(210, 180, 140, 0.4)",
        transition: "all 0.3s ease",
      }}
      className="rounded-t-lg py-0"
    >
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
          <CardTitle className="text-lg font-bold" style={{ color: "#8b4513" }}>
            {ingredient.name}
          </CardTitle>
          <CardDescription className="text-sm" style={{ color: "#8b4513" }}>
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
              style={{
                border: "1px solid rgba(222, 184, 135, 0.5)",
                color: "#a0522d",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.7) 100%)",
              }}
            >
              <Minus size={16} />
            </Button>

            <div
              className="min-w-[3rem] rounded-lg px-4 py-2 text-center font-bold"
              style={{
                background: "#faf8f0",
                border: "1px solid rgba(222, 184, 135, 0.3)",
                color: "#8b4513",
              }}
            >
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
              style={{
                border: "1px solid rgba(222, 184, 135, 0.5)",
                color: "#a0522d",
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.7) 100%)",
              }}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
