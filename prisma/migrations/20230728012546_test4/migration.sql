/*
  Warnings:

  - You are about to drop the column `backgDarken` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "backgDarken",
ADD COLUMN     "backgroundDarken" BOOLEAN NOT NULL DEFAULT true;
