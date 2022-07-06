-- AlterTable
ALTER TABLE "Confirmation" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';

-- AlterTable
ALTER TABLE "ResetPassword" ALTER COLUMN "expiration" SET DEFAULT NOW() + interval '1 hour';
