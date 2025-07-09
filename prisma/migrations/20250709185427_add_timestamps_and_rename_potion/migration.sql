/*
  Warnings:

  - You are about to drop the `Potion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Potion";

-- CreateTable
CREATE TABLE "CraftingAttempt" (
    "id" TEXT NOT NULL,
    "recipeName" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CraftingAttempt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CraftingAttempt" ADD CONSTRAINT "CraftingAttempt_recipeName_fkey" FOREIGN KEY ("recipeName") REFERENCES "Recipe"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
