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
  color: IngredientType;
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
  "Potion d'invisibilité": { emoji: "👻", color: "magical" },
  "Potion d'amour": { emoji: "💕", color: "precious" },
  "Potion de jeunesse": { emoji: "✨", color: "liquid" },
  "Potion d'immortalité": { emoji: "♾️", color: "metal" },
  "Potion de Clairvoyance": { emoji: "🔮", color: "magical" },
  "Potion de Force": { emoji: "💪", color: "animal" },
  "Potion de Vitesse": { emoji: "⚡", color: "liquid" },
  "Potion de Guérison": { emoji: "❤️‍🩹", color: "plant" },
  "Potion de Transformation": { emoji: "🦋", color: "magical" },
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

export function getRecipeColor(name: string): IngredientType {
  return RECIPE_ASSETS[name]?.color || "magical";
}
