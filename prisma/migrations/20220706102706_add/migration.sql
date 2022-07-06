-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- CreateTable
CREATE TABLE "Timetable" (
    "id" SERIAL NOT NULL,
    "sunday" JSONB[],
    "monday" JSONB[],
    "tuesday" JSONB[],
    "wednesday" JSONB[],
    "thursday" JSONB[],
    "friday" JSONB[],
    "saturday" JSONB[],
    "weekend" JSONB[],
    "weekdays" JSONB[],

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);
