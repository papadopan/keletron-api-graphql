/*
  Warnings:

  - You are about to drop the `Timetable` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- DropTable
DROP TABLE "Timetable";
