-- CreateTable
CREATE TABLE "ResetPassword" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "expiration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResetPassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPassword_email_key" ON "ResetPassword"("email");
