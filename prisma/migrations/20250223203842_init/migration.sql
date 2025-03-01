/*
  Warnings:

  - Made the column `type` on table `Inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Inventory" ALTER COLUMN "type" SET NOT NULL;
