import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  ingredients: z.array(z.string()),
  discovered: z.boolean().default(false),
  description: z.string().default(""),
});

export type Recipe = z.infer<typeof RecipeSchema>;

export const CreateRecipeSchema = RecipeSchema.omit({ id: true });
export type CreateRecipe = z.infer<typeof CreateRecipeSchema>;

export const UpdateRecipeSchema = RecipeSchema.partial().required({ id: true });
export type UpdateRecipe = z.infer<typeof UpdateRecipeSchema>;

export const RecipeCheckRequestSchema = z.object({
  ingredientNames: z.array(z.string()).length(3, "3 ingredients required"),
});

export type RecipeCheckRequest = z.infer<typeof RecipeCheckRequestSchema>;

export const RecipeCheckResponseSchema = z.object({
  success: z.boolean(),
  recipe: RecipeSchema.optional(),
  message: z.string(),
});

export type RecipeCheckResponse = z.infer<typeof RecipeCheckResponseSchema>;
