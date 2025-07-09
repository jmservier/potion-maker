import { z } from "zod";

export const CraftingAttemptSchema = z.object({
  id: z.string().cuid(),
  recipeName: z.string().min(1, "recipe name is required"),
  success: z.boolean().default(true),
  createdAt: z.date(),
});

export type CraftingAttempt = z.infer<typeof CraftingAttemptSchema>;

export const CreateCraftingAttemptSchema = CraftingAttemptSchema.omit({
  id: true,
  createdAt: true,
});
export type CreateCraftingAttempt = z.infer<typeof CreateCraftingAttemptSchema>;

export const UpdateCraftingAttemptSchema =
  CraftingAttemptSchema.partial().required({ id: true });
export type UpdateCraftingAttempt = z.infer<typeof UpdateCraftingAttemptSchema>;

// TODO: remove after deployment
// Legacy exports for retro-compatibility
export const PotionSchema = CraftingAttemptSchema;
export type Potion = CraftingAttempt;
export const CreatePotionSchema = CreateCraftingAttemptSchema;
export type CreatePotion = CreateCraftingAttempt;
export const UpdatePotionSchema = UpdateCraftingAttemptSchema;
export type UpdatePotion = UpdateCraftingAttempt;
