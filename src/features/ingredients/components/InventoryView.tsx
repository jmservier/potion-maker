"use client";

import { useState } from "react";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useIngredients,
  useResetInventory,
  useUpdateIngredient,
} from "@/features/ingredients/hooks/useIngredients";
import { Ingredient } from "@/schemas";

interface InventoryViewProps {
  initialIngredients: Ingredient[];
}

export default function InventoryView({
  initialIngredients,
}: InventoryViewProps) {
  const { data: ingredients } = useIngredients(initialIngredients);
  const updateMutation = useUpdateIngredient();
  const resetMutation = useResetInventory();
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);

  const handleUpdateQuantity = async (id: string, newQuantity: number) => {
    try {
      await updateMutation.mutateAsync({ id, data: { quantity: newQuantity } });
    } catch (error) {
      console.error("Failed to update ingredient:", error);
    }
  };

  const handleRestockAll = async () => {
    try {
      await resetMutation.mutateAsync();
      setIsRestockDialogOpen(false);
    } catch (error) {
      console.error("Failed to restock ingredients:", error);
    }
  };

  const totalItems =
    ingredients?.reduce((sum, ingredient) => sum + ingredient.quantity, 0) || 0;
  const availableTypes =
    ingredients?.filter((ingredient) => ingredient.quantity > 0).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            <span>📦</span> Magical Inventory <span>📦</span>
          </h1>
        </div>
        <Navigation />
        <div className="space-y-6">
          <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Inventory Overview
              </h2>
              <AlertDialog
                open={isRestockDialogOpen}
                onOpenChange={setIsRestockDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Restock All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-gray-600 bg-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Restock Inventory
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Are you sure you want to restock all ingredients to their
                      default quantities?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRestockAll}
                      disabled={resetMutation.isPending}
                      className="bg-amber-600 text-white hover:bg-amber-700"
                    >
                      {resetMutation.isPending
                        ? "Restocking..."
                        : "Restock All"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2">
              <div className="rounded-lg bg-gray-800/50 p-4">
                <div className="text-2xl font-bold text-amber-400">
                  {totalItems}
                </div>
                <div className="text-sm text-gray-300">Total Items</div>
              </div>
              <div className="rounded-lg bg-gray-800/50 p-4">
                <div className="text-2xl font-bold text-green-400">
                  {availableTypes}
                </div>
                <div className="text-sm text-gray-300">Available Types</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
              <span>🧪</span> Ingredients
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ingredients?.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  className="border-gray-600/50 bg-gray-800/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">🔮</div>
                    </div>
                    <CardTitle className="text-lg text-white">
                      {ingredient.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleUpdateQuantity(
                              ingredient.id,
                              Math.max(0, ingredient.quantity - 1),
                            )
                          }
                          disabled={
                            ingredient.quantity <= 0 || updateMutation.isPending
                          }
                          className="h-8 w-8 border-gray-600 bg-transparent p-0 text-gray-300 hover:bg-gray-700"
                        >
                          <Minus size={14} />
                        </Button>

                        <div className="min-w-[3rem] rounded bg-gray-700/50 px-3 py-1 text-center font-bold text-white">
                          {ingredient.quantity}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleUpdateQuantity(
                              ingredient.id,
                              ingredient.quantity + 1,
                            )
                          }
                          disabled={updateMutation.isPending}
                          className="h-8 w-8 border-gray-600 bg-transparent p-0 text-gray-300 hover:bg-gray-700"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
