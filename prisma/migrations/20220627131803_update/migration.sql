/*
  Warnings:

  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "city" SET DEFAULT E'Kastoria',
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "country" SET DEFAULT E'Greece';
