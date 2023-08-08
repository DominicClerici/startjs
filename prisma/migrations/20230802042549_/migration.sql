/*
  Warnings:

  - You are about to drop the column `useSpotify` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "useSpotify";

-- CreateTable
CREATE TABLE "UserConnections" (
    "id" TEXT NOT NULL,
    "useWeather" BOOLEAN NOT NULL DEFAULT false,
    "latCoord" DOUBLE PRECISION,
    "lonCoord" DOUBLE PRECISION,
    "lastRefreshed" TIMESTAMP(3),
    "temp" INTEGER,
    "icon" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserConnections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserConnections_userId_key" ON "UserConnections"("userId");

-- AddForeignKey
ALTER TABLE "UserConnections" ADD CONSTRAINT "UserConnections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
