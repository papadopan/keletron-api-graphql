/*
  Warnings:

  - Made the column `token_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "token_id" SET NOT NULL,
ALTER COLUMN "token_id" SET DEFAULT E'';
