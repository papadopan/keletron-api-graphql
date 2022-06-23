-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "court" VARCHAR(20) NOT NULL,
    "num_players" INTEGER NOT NULL,
    "date_booking" VARCHAR(80) NOT NULL,
    "time_slot" VARCHAR(80) NOT NULL,
    "opponents" TEXT[],

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
