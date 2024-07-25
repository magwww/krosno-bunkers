/*
  Warnings:

  - You are about to drop the column `userId` on the `Bunker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bunker" DROP CONSTRAINT "Bunker_userId_fkey";

-- AlterTable
ALTER TABLE "Bunker" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_BunkerToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BunkerToUser_AB_unique" ON "_BunkerToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BunkerToUser_B_index" ON "_BunkerToUser"("B");

-- AddForeignKey
ALTER TABLE "_BunkerToUser" ADD CONSTRAINT "_BunkerToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Bunker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BunkerToUser" ADD CONSTRAINT "_BunkerToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
