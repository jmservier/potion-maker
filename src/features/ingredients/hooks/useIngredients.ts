import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateIngredient,
  Ingredient,
  UpdateIngredientRequest,
} from "@/schemas";

export function useIngredients(initialData?: Ingredient[]) {
  return useQuery({
    queryKey: ["ingredients"],
    queryFn: async () => {
      const response = await fetch("/api/ingredients");
      if (!response.ok) {
        throw new Error("Échec du chargement des ingrédients");
      }
      return response.json() as Promise<Ingredient[]>;
    },
    initialData,
  });
}

export function useCreateIngredient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateIngredient) => {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Échec de la création de l'ingrédient");
      }
      return response.json() as Promise<Ingredient>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}

export function useUpdateIngredient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateIngredientRequest;
    }) => {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Échec de la mise à jour de l'ingrédient",
        );
      }
      return response.json() as Promise<Ingredient>;
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["ingredients"] });

      const previousIngredients = queryClient.getQueryData<Ingredient[]>([
        "ingredients",
      ]);

      if (previousIngredients) {
        queryClient.setQueryData<Ingredient[]>(
          ["ingredients"],
          (old) =>
            old?.map((ingredient) =>
              ingredient.id === id ? { ...ingredient, ...data } : ingredient,
            ) || [],
        );
      }

      return { previousIngredients };
    },
    onError: (err, variables, context) => {
      if (context?.previousIngredients) {
        queryClient.setQueryData(["ingredients"], context.previousIngredients);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}

export function useDeleteIngredient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Échec de la suppression de l'ingrédient",
        );
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}

export function useResetInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/ingredients/reset", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Échec de la réinitialisation de l'inventaire");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
    },
  });
}
