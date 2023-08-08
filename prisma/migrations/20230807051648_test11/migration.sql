/*
  Warnings:

  - You are about to drop the column `isChecklist` on the `UserTasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTasks" DROP COLUMN "isChecklist",
ALTER COLUMN "content" SET DATA TYPE TEXT;
