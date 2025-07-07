import { z } from "zod";

export const PotionSchema = z.object({
  id: z.string().cuid(),
  recipeName: z.string().min(1, "recipe name is required"),
  success: z.boolean().default(true),
});

export type Potion = z.infer<typeof PotionSchema>;

export const CreatePotionSchema = PotionSchema.omit({ id: true });
export type CreatePotion = z.infer<typeof CreatePotionSchema>;

export const UpdatePotionSchema = PotionSchema.partial().required({ id: true });
export type UpdatePotion = z.infer<typeof UpdatePotionSchema>;
