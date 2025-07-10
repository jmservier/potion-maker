"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
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
import {
  useIngredients,
  useResetInventory,
  useUpdateIngredient,
} from "@/features/ingredients/hooks/useIngredients";
import { Ingredient } from "@/schemas";
import { InventoryIngredientCard } from "./inventory-ingredient-card";
import { StatCard } from "./stat-card";

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
    <div className="space-y-8 fade-in">
      <div className="glass-card warm-glow rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">Inventaire</h2>
          <AlertDialog
            open={isRestockDialogOpen}
            onOpenChange={setIsRestockDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="border-orange hover:bg-orange/10 rounded-xl bg-transparent"
              >
                <RotateCcw size={18} className="mr-2" />
                Réapprovisionner
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Réapprovisionner l&apos;Inventaire
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir réapprovisionner tous les ingrédients
                  à leurs quantités par défaut ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRestockAll}
                  disabled={resetMutation.isPending}
                >
                  {resetMutation.isPending
                    ? "Réapprovisionnement..."
                    : "Réapprovisionner Tout"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <StatCard value={totalItems} label="Total d'ingrédients" />
          <StatCard value={availableTypes} label="Types disponibles" />
        </div>
      </div>
      <div className="glass-card warm-glow rounded-2xl p-8">
        <h2 className="mb-6 text-2xl font-bold">Tous les Ingrédients</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ingredients?.map((ingredient) => (
            <InventoryIngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              onUpdateQuantity={handleUpdateQuantity}
              isUpdating={updateMutation.isPending}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
