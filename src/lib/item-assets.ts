export type IngredientType =
  | "tropical"
  | "metal"
  | "plant"
  | "animal"
  | "liquid"
  | "precious"
  | "magical";

export type PotionType =
  | "transformation"
  | "enhancement"
  | "protection"
  | "utility";

interface IngredientAsset {
  emoji: string;
  color: IngredientType;
}

interface RecipeAsset {
  emoji: string;
  type: PotionType;
}

export const INGREDIENT_ASSETS: Record<string, IngredientAsset> = {
  Argent: { emoji: "🥈", color: "precious" },
  Or: { emoji: "🥇", color: "precious" },

  Yttrium: { emoji: "💎", color: "metal" },

  "Noix de coco": { emoji: "🥥", color: "tropical" },

  Mandragore: { emoji: "🌿", color: "plant" },
  "Jus de Horglup": { emoji: "🧪", color: "plant" },

  "Épine de hérisson": { emoji: "🦔", color: "animal" },
  "Queue d'écureuil": { emoji: "🐿️", color: "animal" },
  "Bave de lama": { emoji: "🦙", color: "animal" },
  "Plume de griffon": { emoji: "🪶", color: "animal" },
  "Poil de yéti": { emoji: "❄️", color: "animal" },

  "Crin de licorne": { emoji: "🦄", color: "magical" },

  "Hélium liquide": { emoji: "🎈", color: "liquid" },
  "Azote liquide": { emoji: "🧊", color: "liquid" },
};

export const RECIPE_ASSETS: Record<string, RecipeAsset> = {
  "Potion d'invisibilité": { emoji: "👻", type: "utility" },
  "Potion d'amour": { emoji: "💕", type: "transformation" },
  "Potion de jeunesse": { emoji: "✨", type: "enhancement" },
  "Potion d'immortalité": { emoji: "♾️", type: "protection" },
  "Potion de Clairvoyance": { emoji: "🔮", type: "utility" },
  "Potion de Force": { emoji: "💪", type: "enhancement" },
  "Potion de Vitesse": { emoji: "⚡", type: "enhancement" },
  "Potion de Guérison": { emoji: "❤️‍🩹", type: "protection" },
  "Potion de Transformation": { emoji: "🦋", type: "transformation" },
};

export function getIngredientEmoji(name: string): string {
  return INGREDIENT_ASSETS[name]?.emoji || "🧪";
}

export function getIngredientColor(name: string): IngredientType {
  return INGREDIENT_ASSETS[name]?.color || "magical";
}

export function getRecipeEmoji(name: string): string {
  return RECIPE_ASSETS[name]?.emoji || "🧪";
}

export function getRecipeType(name: string): PotionType {
  return RECIPE_ASSETS[name]?.type || "utility";
}
