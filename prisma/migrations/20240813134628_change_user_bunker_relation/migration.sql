/*
  Warnings:

  - You are about to drop the `_BunkerToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BunkerToUser" DROP CONSTRAINT "_BunkerToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_BunkerToUser" DROP CONSTRAINT "_BunkerToUser_B_fkey";

-- DropTable
DROP TABLE "_BunkerToUser";

-- CreateTable
CREATE TABLE "UserBunker" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bunkerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBunker_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBunker_userId_bunkerId_idx" ON "UserBunker"("userId", "bunkerId");

-- AddForeignKey
ALTER TABLE "UserBunker" ADD CONSTRAINT "UserBunker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBunker" ADD CONSTRAINT "UserBunker_bunkerId_fkey" FOREIGN KEY ("bunkerId") REFERENCES "Bunker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
