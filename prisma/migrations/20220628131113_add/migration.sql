/*
  Warnings:

  - Added the required column `userId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
