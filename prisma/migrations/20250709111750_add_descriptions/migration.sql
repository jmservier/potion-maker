-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
