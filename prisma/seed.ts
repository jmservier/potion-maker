import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
