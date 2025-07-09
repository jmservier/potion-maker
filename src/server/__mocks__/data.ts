import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import type { Recipe } from "@/features/recipes/schemas/recipe.schema";

export const mockIngredients: Ingredient[] = [
  {
    id: "ing1",
    name: "Argent",
    quantity: 10,
    description: "Métal lunaire qui amplifie la magie.",
  },
  {
    id: "ing2",
    name: "Bave de lama",
    quantity: 10,
    description: "Substance collante aux vertus liantes.",
  },
  {
    id: "ing3",
    name: "Épine de hérisson",
    quantity: 10,
    description: "Épine rigide aux propriétés protectrices.",
  },
  {
    id: "ing4",
    name: "Plume de griffon",
    quantity: 10,
    description: "Plume légère imprégnée d'énergie céleste.",
  },
  {
    id: "ing5",
    name: "Hélium liquide",
    quantity: 10,
    description: "Gaz ultrafroid utilisé pour alléger les potions.",
  },
  {
    id: "ing6",
    name: "Poil de yéti",
    quantity: 10,
    description: "Poil robuste chargé d'énergie brute.",
  },
  {
    id: "ing7",
    name: "Or",
    quantity: 10,
    description: "Métal précieux, excellent conducteur magique.",
  },
  {
    id: "ing8",
    name: "Azote liquide",
    quantity: 10,
    description: "Liquide glacial capable de figer la matière.",
  },
  {
    id: "ing9",
    name: "Queue d'écureuil",
    quantity: 10,
    description: "Queue souple, symbole d'agilité.",
  },
  {
    id: "ing10",
    name: "Crin de licorne",
    quantity: 10,
    description: "Filament purificateur d'une licorne.",
  },
  {
    id: "ing11",
    name: "Jus de Horglup",
    quantity: 10,
    description: "Jus visqueux prolongeant la durée des sorts.",
  },
  {
    id: "ing12",
    name: "Noix de coco",
    quantity: 10,
    description: "Coque dure renfermant une eau sucrée.",
  },
  {
    id: "ing13",
    name: "Yttrium",
    quantity: 10,
    description: "Métal rare à fort potentiel magique.",
  },
  {
    id: "ing14",
    name: "Mandragore",
    quantity: 10,
    description: "Racine vivante prisée en alchimie.",
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: "rec1",
    name: "Potion d'invisibilité",
    ingredients: ["Noix de coco", "Yttrium", "Mandragore"],
    discovered: false,
    description: "Rend invisible pendant quelques heures.",
  },
  {
    id: "rec2",
    name: "Potion d'amour",
    ingredients: ["Bave de lama", "Plume de griffon", "Hélium liquide"],
    discovered: false,
    description: "Fait naître un sentiment d'amour immédiat.",
  },
  {
    id: "rec3",
    name: "Potion de jeunesse",
    ingredients: ["Or", "Crin de licorne", "Azote liquide"],
    discovered: false,
    description: "Redonne éclat et vitalité au corps.",
  },
  {
    id: "rec4",
    name: "Potion d'immortalité",
    ingredients: ["Poil de yéti", "Jus de Horglup", "Argent"],
    discovered: false,
    description: "Stoppe le vieillissement du buveur.",
  },
  {
    id: "rec5",
    name: "Potion de Clairvoyance",
    ingredients: ["Épine de hérisson", "Jus de Horglup", "Noix de coco"],
    discovered: false,
    description: "Permet de voir passé et futur un court instant.",
  },
  {
    id: "rec6",
    name: "Potion de Force",
    ingredients: ["Poil de yéti", "Or", "Argent"],
    discovered: false,
    description: "Multiplie la force physique pendant une heure.",
  },
  {
    id: "rec7",
    name: "Potion de Vitesse",
    ingredients: ["Hélium liquide", "Plume de griffon", "Azote liquide"],
    discovered: false,
    description: "Autorise des déplacements ultra-rapides.",
  },
  {
    id: "rec8",
    name: "Potion de Guérison",
    ingredients: ["Crin de licorne", "Mandragore", "Bave de lama"],
    discovered: true,
    description: "Soigne rapidement blessures et maladies.",
  },
  {
    id: "rec9",
    name: "Potion de Transformation",
    ingredients: ["Queue d'écureuil", "Yttrium", "Épine de hérisson"],
    discovered: false,
    description: "Change d'apparence pour une courte durée.",
  },
];
