/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "backgroundColor",
ADD COLUMN     "backgroundColorDark" TEXT NOT NULL DEFAULT 'rgb(30,31,35)',
ADD COLUMN     "backgroundColorLight" TEXT NOT NULL DEFAULT 'rgb(200,200,200)',
ADD COLUMN     "backgroundImgAuthor" TEXT,
ADD COLUMN     "backgroundImgTitle" TEXT,
ADD COLUMN     "backgroundURL" TEXT;

-- CreateTable
CREATE TABLE "UserTasks" (
    "id" TEXT NOT NULL,
    "timeDue" TIMESTAMP(3) NOT NULL,
    "timeUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "isChecklist" BOOLEAN NOT NULL,
    "content" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserTasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTasks_userId_key" ON "UserTasks"("userId");

-- AddForeignKey
ALTER TABLE "UserTasks" ADD CONSTRAINT "UserTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
