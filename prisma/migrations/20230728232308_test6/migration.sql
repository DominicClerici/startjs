/*
  Warnings:

  - Changed the type of `order` on the `UserShortcuts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserShortcuts" ALTER COLUMN "color" DROP NOT NULL,
DROP COLUMN "order",
ADD COLUMN     "order" INTEGER NOT NULL,
ALTER COLUMN "items" DROP NOT NULL;
