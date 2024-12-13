/*
  Warnings:

  - A unique constraint covering the columns `[bunkerId]` on the table `UserBunker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserBunker_bunkerId_key" ON "UserBunker"("bunkerId");
