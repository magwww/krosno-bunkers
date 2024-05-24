/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `Bunker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bunker_address_key" ON "Bunker"("address");
