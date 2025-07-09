-- DropForeignKey
ALTER TABLE "CraftingAttempt" DROP CONSTRAINT "CraftingAttempt_recipeName_fkey";

-- AlterTable
ALTER TABLE "CraftingAttempt" ALTER COLUMN "recipeName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CraftingAttempt" ADD CONSTRAINT "CraftingAttempt_recipeName_fkey" FOREIGN KEY ("recipeName") REFERENCES "Recipe"("name") ON DELETE SET NULL ON UPDATE CASCADE;
