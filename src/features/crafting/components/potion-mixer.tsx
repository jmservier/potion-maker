"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RotateCcw, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getIngredientEmoji } from "@/lib/item-assets";
import { Ingredient } from "@/schemas";
import { brewPotionMutation } from "../mutations";

interface PotionMixerProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
  onSuccess?: () => void;
  onClear: () => void;
  onReset?: () => void;
}

export function PotionMixer({
  selectedIngredients,
  onRemoveIngredient,
  onSuccess,
  onClear,
  onReset,
}: PotionMixerProps) {
  const queryClient = useQueryClient();
  const [isBrewing, setIsBrewing] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: brewPotionMutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      // TODO: check if recipe is already discovered
      if (data.success) {
        toast.success(`🎉 Recette découverte : ${data.recipe.name} !`);
      } else {
        toast.error("Aucune recette trouvée avec ces ingrédients");
      }
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Échec de la préparation de la potion");
    },
    onSettled: () => {
      setIsBrewing(false);
    },
  });

  const handleBrewPotion = () => {
    setIsBrewing(true);
    mutate(selectedIngredients);
  };

  return (
    <motion.div
      layout
      className="rounded-2xl fade-in"
      role="region"
      aria-label="Potion mixer"
    >
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <span aria-hidden="true">🔮</span> Atelier de Potions
      </h2>
      <div className="mb-6">
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {isBrewing && "Brewing potion, please wait"}
          {!isBrewing &&
            selectedIngredients.length === 3 &&
            "Ready to brew potion"}
        </div>
        <motion.div
          layout
          className="brewing-area flex min-h-[120px] flex-wrap items-center justify-center gap-3 rounded-xl p-6"
          role="group"
          aria-label="Selected ingredients"
        >
          <AnimatePresence mode="popLayout">
            {selectedIngredients.map((ingredient, index) => (
              <motion.div
                layout
                key={`${ingredient.id}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="selected-ingredient flex w-full items-center justify-between rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">
                    {getIngredientEmoji(ingredient.name)}
                  </span>
                  <span className="font-semibold">{ingredient.name}</span>
                </div>
                <button
                  onClick={() => onRemoveIngredient(index)}
                  className="focus-ring ml-2 rounded-md p-1 transition-transform hover:-translate-y-[2px]"
                  aria-label={`Remove ${ingredient.name} from slot ${index + 1}`}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </motion.div>
            ))}
            {selectedIngredients.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mb-3 text-5xl opacity-50" aria-hidden="true">
                  🧪
                </div>
                <div className="text-base font-medium">
                  Sélectionnez 3 ingrédients pour commencer
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <div
          className="mt-4 text-center text-base font-medium"
          aria-live="polite"
        >
          {selectedIngredients.length}/3 ingrédients sélectionnés
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isBrewing && (
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="mb-4 text-6xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            >
              ⚗️
            </motion.div>
            <div className="animate-pulse text-lg font-medium text-slate">
              Brassage en cours...
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-brown h-3 w-3 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <Button
          onClick={handleBrewPotion}
          disabled={selectedIngredients.length !== 3 || isPending}
          className="btn-primary focus-ring w-full rounded-xl py-4 text-lg font-bold text-white transition-all duration-200 disabled:opacity-50"
          aria-label="Create potion with selected ingredients"
        >
          <Sparkles className="mr-3" size={24} aria-hidden="true" />
          {isPending ? "Création en cours..." : "Créer la Potion"}
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={onClear}
            disabled={selectedIngredients.length === 0 || isPending}
            variant="outline"
            className="btn-secondary focus-ring flex-1 rounded-xl bg-transparent py-3 font-semibold"
            aria-label="Clear all selected ingredients"
          >
            Vider
          </Button>
          {onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              className="btn-secondary focus-ring flex-1 rounded-xl bg-transparent py-3 font-semibold"
              aria-label="Reset all recipes"
            >
              <RotateCcw size={18} className="mr-2" aria-hidden="true" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
