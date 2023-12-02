/*
  Warnings:

  - You are about to drop the column `distributedByUserId` on the `ProductDistribution` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductDistribution" DROP CONSTRAINT "ProductDistribution_distributedByUserId_fkey";

-- AlterTable
ALTER TABLE "ProductDistribution" DROP COLUMN "distributedByUserId";
