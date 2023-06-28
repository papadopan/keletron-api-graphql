/*
  Warnings:

  - Added the required column `validation` to the `Confirmation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Confirmation" ADD COLUMN     "validation" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "monday" TEXT NOT NULL,
    "tuesday" TEXT NOT NULL,
    "wednesday" TEXT NOT NULL,
    "thursday" TEXT NOT NULL,
    "friday" TEXT NOT NULL,
    "saturday" TEXT NOT NULL,
    "sunday" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
