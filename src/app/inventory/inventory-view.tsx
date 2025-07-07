"use client";

import { useState } from "react";
import { Ingredient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Plus, Minus, RotateCcw } from "lucide-react";
import {
  useIngredients,
  useResetInventory,
  useUpdateIngredient,
} from "@/hooks/useIngredients";

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span>📦</span> Magical Inventory <span>📦</span>
          </h1>
        </div>

        <div className="space-y-6">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
            <div className="flex justify-between items-center mb-4">
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
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    Restock All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-600">
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
                    <AlertDialogCancel className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRestockAll}
                      disabled={resetMutation.isPending}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      {resetMutation.isPending
                        ? "Restocking..."
                        : "Restock All"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-amber-400">
                  {totalItems}
                </div>
                <div className="text-sm text-gray-300">Total Items</div>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  {availableTypes}
                </div>
                <div className="text-sm text-gray-300">Available Types</div>
              </div>
            </div>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🧪</span> Ingredients
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ingredients?.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  className="bg-gray-800/50 border-gray-600/50"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl">🔮</div>
                    </div>
                    <CardTitle className="text-white text-lg">
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
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent h-8 w-8 p-0"
                        >
                          <Minus size={14} />
                        </Button>

                        <div className="bg-gray-700/50 px-3 py-1 rounded text-white font-bold min-w-[3rem] text-center">
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
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent h-8 w-8 p-0"
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
