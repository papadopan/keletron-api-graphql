/*
  Warnings:

  - Changed the type of `sunday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `monday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tuesday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `wednesday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `thursday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `friday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `saturday` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weekend` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `weekdays` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "sunday",
ADD COLUMN     "sunday" JSONB NOT NULL,
DROP COLUMN "monday",
ADD COLUMN     "monday" JSONB NOT NULL,
DROP COLUMN "tuesday",
ADD COLUMN     "tuesday" JSONB NOT NULL,
DROP COLUMN "wednesday",
ADD COLUMN     "wednesday" JSONB NOT NULL,
DROP COLUMN "thursday",
ADD COLUMN     "thursday" JSONB NOT NULL,
DROP COLUMN "friday",
ADD COLUMN     "friday" JSONB NOT NULL,
DROP COLUMN "saturday",
ADD COLUMN     "saturday" JSONB NOT NULL,
DROP COLUMN "weekend",
ADD COLUMN     "weekend" JSONB NOT NULL,
DROP COLUMN "weekdays",
ADD COLUMN     "weekdays" JSONB NOT NULL;
