/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Confirmation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- CreateIndex
CREATE UNIQUE INDEX "Confirmation_userId_key" ON "Confirmation"("userId");
