/*
  Warnings:

  - You are about to drop the column `backgroundDarken` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "backgroundDarken",
ADD COLUMN     "accentColor" TEXT NOT NULL DEFAULT 'rgb(0, 247, 255)',
ADD COLUMN     "animations" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT 'rgb(35,35,35)',
ADD COLUMN     "backgroundGradient" TEXT NOT NULL DEFAULT 'linear-gradient(45deg, rgba(0,11,19,1) 0%, rgba(32,51,67,1) 49%, rgba(66,92,116,1) 100%)',
ADD COLUMN     "backgroundOverlay" TEXT,
ADD COLUMN     "backgroundType" TEXT NOT NULL DEFAULT 'gradient';
