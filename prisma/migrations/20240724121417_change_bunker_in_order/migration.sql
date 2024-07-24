/*
  Warnings:

  - You are about to drop the `_BunkerToOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bunkerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BunkerToOrder" DROP CONSTRAINT "_BunkerToOrder_A_fkey";

-- DropForeignKey
ALTER TABLE "_BunkerToOrder" DROP CONSTRAINT "_BunkerToOrder_B_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "bunkerId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BunkerToOrder";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bunkerId_fkey" FOREIGN KEY ("bunkerId") REFERENCES "Bunker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
