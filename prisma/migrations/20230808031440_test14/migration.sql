/*
  Warnings:

  - You are about to drop the column `backgroundImgAuthor` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundImgTitle` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundOverlay` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundURL` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the `UserConnections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserConnections" DROP CONSTRAINT "UserConnections_userId_fkey";

-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "backgroundImgAuthor",
DROP COLUMN "backgroundImgTitle",
DROP COLUMN "backgroundOverlay",
DROP COLUMN "backgroundURL",
DROP COLUMN "nickname",
ALTER COLUMN "accentColor" SET DEFAULT '#00ffb3',
ALTER COLUMN "backgroundGradientDark" SET DEFAULT 'linear-gradient(45deg, #283c86 0%, #8445a2 100%)',
ALTER COLUMN "backgroundGradientLight" SET DEFAULT 'linear-gradient(45deg, rgba(250,255,199,1) 0%, rgba(252,203,156,1) 100%)',
ALTER COLUMN "backgroundColorDark" SET DEFAULT '#033933',
ALTER COLUMN "backgroundColorLight" SET DEFAULT '#57c0ff';

-- DropTable
DROP TABLE "UserConnections";
