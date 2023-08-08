/*
  Warnings:

  - You are about to drop the column `backgroundGradient` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `UserShortcuts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "backgroundGradient",
ADD COLUMN     "backgroundGradientDark" TEXT NOT NULL DEFAULT 'linear-gradient(45deg, rgba(0,11,19,1) 0%, rgba(32,51,67,1) 49%, rgba(66,92,116,1) 100%)',
ADD COLUMN     "backgroundGradientLight" TEXT NOT NULL DEFAULT 'linear-gradient(45deg, rgba(0,11,19,1) 0%, rgba(32,51,67,1) 49%, rgba(66,92,116,1) 100%)',
ALTER COLUMN "backgroundType" SET DEFAULT 'Gradient';

-- AlterTable
ALTER TABLE "UserShortcuts" DROP COLUMN "order";
