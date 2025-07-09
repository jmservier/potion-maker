"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Navigation } from "@/common/components/navigation";
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
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f0" }}>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            <span>📦</span> Inventaire Magique <span>📦</span>
          </h1>
        </div>
        <Navigation />
        <div
          className="space-y-8"
          style={{ animation: "fade-in 0.3s ease-out" }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(222, 184, 135, 0.3)",
              boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h1
                className="font-serif text-3xl font-bold"
                style={{ color: "#8b4513" }}
              >
                Inventaire
              </h1>
              <AlertDialog
                open={isRestockDialogOpen}
                onOpenChange={setIsRestockDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-xl bg-transparent"
                    style={{
                      border: "1px solid rgba(222, 184, 135, 0.5)",
                      color: "#a0522d",
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.7) 100%)",
                    }}
                  >
                    <RotateCcw size={18} className="mr-2" />
                    Réapprovisionner
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-gray-600 bg-gray-800">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">
                      Réapprovisionner l&apos;Inventaire
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Êtes-vous sûr de vouloir réapprovisionner tous les
                      ingrédients à leurs quantités par défaut ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600">
                      Annuler
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleRestockAll}
                      disabled={resetMutation.isPending}
                      className="bg-amber-600 text-white hover:bg-amber-700"
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
              <StatCard value={totalItems} label="Total d'objets" />
              <StatCard value={availableTypes} label="Types disponibles" />
            </div>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(222, 184, 135, 0.3)",
              boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
            }}
          >
            <h2
              className="mb-6 font-serif text-2xl font-semibold"
              style={{ color: "#8b4513" }}
            >
              Tous les Ingrédients
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </div>
  );
}
