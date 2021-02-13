-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" SMALLINT NOT NULL,
    "month" SMALLINT NOT NULL,
    "day" SMALLINT NOT NULL,
    "hour" SMALLINT NOT NULL,
    "minute" SMALLINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.timestamp_unique" ON "Appointment"("timestamp");
