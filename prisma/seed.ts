import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const potionDescriptions: Record<string, string> = {
  "Potion d'invisibilité": "Rend invisible pendant quelques heures.",
  "Potion d'amour": "Fait naître un sentiment d'amour immédiat.",
  "Potion de jeunesse": "Redonne éclat et vitalité au corps.",
  "Potion d'immortalité": "Stoppe le vieillissement du buveur.",
  "Potion de Clairvoyance": "Permet de voir passé et futur un court instant.",
  "Potion de Force": "Multiplie la force physique pendant une heure.",
  "Potion de Vitesse": "Autorise des déplacements ultra-rapides.",
  "Potion de Guérison": "Soigne rapidement blessures et maladies.",
  "Potion de Transformation": "Change d'apparence pour une courte durée.",
};

export const ingredientDescriptions: Record<string, string> = {
  "Noix de coco": "Coque dure renfermant une eau sucrée.",
  Yttrium: "Métal rare à fort potentiel magique.",
  Mandragore: "Racine vivante prisée en alchimie.",
  "Bave de lama": "Substance collante aux vertus liantes.",
  "Plume de griffon": "Plume légère imprégnée d'énergie céleste.",
  "Hélium liquide": "Gaz ultrafroid utilisé pour alléger les potions.",
  Or: "Métal précieux, excellent conducteur magique.",
  "Crin de licorne": "Filament purificateur d'une licorne.",
  "Azote liquide": "Liquide glacial capable de figer la matière.",
  "Poil de yéti": "Poil robuste chargé d'énergie brute.",
  "Jus de Horglup": "Jus visqueux prolongeant la durée des sorts.",
  Argent: "Métal lunaire qui amplifie la magie.",
  "Épine de hérisson": "Épine rigide aux propriétés protectrices.",
  "Queue d'écureuil": "Queue souple, symbole d'agilité.",
};

const ingredients = [
  "Argent",
  "Bave de lama",
  "Épine de hérisson",
  "Plume de griffon",
  "Hélium liquide",
  "Poil de yéti",
  "Or",
  "Azote liquide",
  "Queue d'écureuil",
  "Crin de licorne",
  "Jus de Horglup",
  "Noix de coco",
  "Yttrium",
  "Mandragore",
];

const recipes = [
  {
    name: "Potion d'invisibilité",
    ingredients: ["Noix de coco", "Yttrium", "Mandragore"],
  },
  {
    name: "Potion d'amour",
    ingredients: ["Bave de lama", "Plume de griffon", "Hélium liquide"],
  },
  {
    name: "Potion de jeunesse",
    ingredients: ["Or", "Crin de licorne", "Azote liquide"],
  },
  {
    name: "Potion d'immortalité",
    ingredients: ["Poil de yéti", "Jus de Horglup", "Argent"],
  },
  {
    name: "Potion de Clairvoyance",
    ingredients: ["Épine de hérisson", "Jus de Horglup", "Noix de coco"],
  },
  {
    name: "Potion de Force",
    ingredients: ["Poil de yéti", "Or", "Argent"],
  },
  {
    name: "Potion de Vitesse",
    ingredients: ["Hélium liquide", "Plume de griffon", "Azote liquide"],
  },
  {
    name: "Potion de Guérison",
    ingredients: ["Crin de licorne", "Mandragore", "Bave de lama"],
  },
  {
    name: "Potion de Transformation",
    ingredients: ["Queue d'écureuil", "Yttrium", "Épine de hérisson"],
  },
];

function getRandomQuantity(): number {
  return Math.floor(Math.random() * 20) + 5;
}

async function seedIngredients() {
  console.log("<1 Seeding ingredients...");

  for (const ingredientName of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ingredientName },
      update: {},
      create: {
        name: ingredientName,
        quantity: getRandomQuantity(),
        description: ingredientDescriptions[ingredientName] || "",
      },
    });
  }

  console.log(" Ingredients seeded successfully");
}

async function seedRecipes() {
  console.log("<1 Seeding recipes...");

  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: { name: recipe.name },
      update: {},
      create: {
        name: recipe.name,
        ingredients: recipe.ingredients,
        discovered: false,
        description: potionDescriptions[recipe.name] || "",
      },
    });
  }

  console.log(" Recipes seeded successfully");
}

async function seedSamplePotions() {
  console.log("<1 Seeding sample potions...");

  const samplePotions = [
    {
      recipeName: "Potion de Guérison",
      success: true,
    },
    {
      recipeName: "Potion de Force",
      success: true,
    },
    {
      recipeName: "Expérience échouée",
      success: false,
    },
  ];

  for (const potion of samplePotions) {
    await prisma.potion.create({
      data: potion,
    });
  }

  console.log(" Sample potions seeded successfully");
}

async function main() {
  console.log("= Starting database seeding...");

  try {
    await seedIngredients();
    await seedRecipes();
    await seedSamplePotions();

    console.log("< Database seeding completed successfully!");

    const ingredientCount = await prisma.ingredient.count();
    const recipeCount = await prisma.recipe.count();
    const potionCount = await prisma.potion.count();

    console.log(`= Database summary:`);
    console.log(`   - ${ingredientCount} ingredients`);
    console.log(`   - ${recipeCount} recipes`);
    console.log(`   - ${potionCount} potions`);
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

async function cleanup() {
  console.log("> Cleaning up database...");

  await prisma.potion.deleteMany({});
  await prisma.recipe.deleteMany({});
  await prisma.ingredient.deleteMany({});

  console.log(" Database cleaned up");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export { seedIngredients, seedRecipes, seedSamplePotions, cleanup };
