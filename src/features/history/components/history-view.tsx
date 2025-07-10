"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { History, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRecipeEmoji } from "@/lib/item-assets";
import type { CraftingAttempt, Recipe } from "@/schemas";
import { AttemptCard } from "./attempt-card";
import { HistoryStats } from "./history-stats";
import { SuccessRateChart } from "./success-rate-chart";
import { TopIngredients } from "./top-ingredients";

interface HistoryViewProps {
  initialAttempts: CraftingAttempt[];
  recipes: Recipe[];
}

interface ExtendedCraftingAttempt extends CraftingAttempt {
  ingredients: string[];
  potionName?: string;
  potionEmoji?: string;
}

export function HistoryView({ initialAttempts, recipes }: HistoryViewProps) {
  const queryClient = useQueryClient();

  const { data: attempts = [] } = useQuery({
    queryKey: ["crafting-attempts"],
    queryFn: async () => {
      const response = await fetch("/api/crafting");
      if (!response.ok) throw new Error("Failed to fetch attempts");
      const data = await response.json();
      return extendAttemptsWithIngredients(data);
    },
    initialData: () => extendAttemptsWithIngredients(initialAttempts),
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/crafting/clear", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to clear history");
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["crafting-attempts"], []);
      toast.success("Historique effacé");
    },
    onError: () => {
      toast.error("Échec de l'effacement de l'historique");
    },
  });

  function extendAttemptsWithIngredients(
    attempts: CraftingAttempt[],
  ): ExtendedCraftingAttempt[] {
    return attempts.map((attempt) => {
      const recipe = recipes.find((r) => r.name === attempt.recipeName);
      const extendedAttempt: ExtendedCraftingAttempt = {
        ...attempt,
        ingredients: recipe?.ingredients || [],
        potionName: recipe?.name,
        potionEmoji: recipe?.name ? getRecipeEmoji(recipe.name) : "🧪",
      };
      return extendedAttempt;
    });
  }

  const successfulAttempts = attempts.filter((attempt) => attempt.success);
  const failedAttempts = attempts.filter((attempt) => !attempt.success);
  const uniquePotions = new Set(
    successfulAttempts.map((attempt) => attempt.potionName).filter(Boolean),
  );

  return (
    <div className="space-y-8 fade-in">
      <div className="glass-card warm-glow rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            <History className="" size={40} />
            Historique de mixage
          </h1>
          {attempts.length > 0 && (
            <Button
              onClick={() => clearHistoryMutation.mutate()}
              variant="outline"
              className="border-orange hover:bg-orange/10 rounded-xl bg-transparent"
              disabled={clearHistoryMutation.isPending}
            >
              <RotateCcw size={16} className="mr-2" />
              Effacer l&apos;historique
            </Button>
          )}
        </div>

        <p className="mb-6 text-lg">
          Suivez vos progrès de mixage et apprenez de vos tentatives passées.
        </p>

        <HistoryStats
          totalAttempts={attempts.length}
          successfulAttempts={successfulAttempts.length}
          failedAttempts={failedAttempts.length}
          uniquePotions={uniquePotions.size}
        />
      </div>

      {attempts.length > 0 ? (
        <div className="glass-card warm-glow rounded-2xl p-8">
          <h2 className="mb-6 text-3xl font-bold">Activité Récente</h2>

          <ScrollArea className="border-orange/20 h-[500px] rounded-xl border bg-white/50">
            <div className="space-y-3 p-4">
              {attempts
                .slice()
                .reverse()
                .map((attempt) => (
                  <AttemptCard key={attempt.id} attempt={attempt} />
                ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="glass-card warm-glow rounded-2xl p-8 text-center">
          <div className="mb-4 text-6xl opacity-50">📋</div>
          <h2 className="mb-3 text-2xl font-semibold">
            Pas d&apos;historique encore
          </h2>
          <p className="">
            Commencez à brasser des potions pour voir vos tentatives
            enregistrées ici.
          </p>
        </div>
      )}

      {attempts.length > 0 && (
        <div className="glass-card warm-glow rounded-2xl p-8">
          <h2 className="mb-6 text-3xl font-bold">Statistiques</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <SuccessRateChart
              totalAttempts={attempts.length}
              successfulAttempts={successfulAttempts.length}
            />
            <TopIngredients attempts={attempts} />
          </div>
        </div>
      )}
    </div>
  );
}
