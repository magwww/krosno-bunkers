/*
  Warnings:

  - Made the column `capacity` on table `Bunker` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bunker" ALTER COLUMN "capacity" SET NOT NULL;
