import { z } from "zod";

export const IngredientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "name is required"),
  quantity: z
    .number()
    .int()
    .min(0, "quantity must be non-negative")
    .default(10),
  description: z.string().default(""),
});

export type Ingredient = z.infer<typeof IngredientSchema>;

export const CreateIngredientSchema = IngredientSchema.omit({ id: true });
export type CreateIngredient = z.infer<typeof CreateIngredientSchema>;

export const UpdateIngredientSchema = IngredientSchema.partial().required({
  id: true,
});
export type UpdateIngredient = z.infer<typeof UpdateIngredientSchema>;

export const IngredientIdParamsSchema = z.object({
  id: z.string().min(1, "id is required"),
});

export type IngredientIdParams = z.infer<typeof IngredientIdParamsSchema>;

export const UpdateIngredientRequestSchema = z.object({
  name: z.string().min(1, "name is required").optional(),
  quantity: z.number().int().min(0, "quantity must be non-negative").optional(),
  description: z.string().optional(),
});

export type UpdateIngredientRequest = z.infer<
  typeof UpdateIngredientRequestSchema
>;

export const ResetInventoryResponseSchema = z.object({
  message: z.string(),
});

export type ResetInventoryResponse = z.infer<
  typeof ResetInventoryResponseSchema
>;
