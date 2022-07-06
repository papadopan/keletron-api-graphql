/*
  Warnings:

  - Added the required column `userId` to the `Confirmation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Confirmation" ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
