/*
  Warnings:

  - You are about to drop the `appointments` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "month" SMALLINT NOT NULL,
    "day" SMALLINT NOT NULL,
    "year" SMALLINT NOT NULL,
    "time" SMALLINT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "appointments";
