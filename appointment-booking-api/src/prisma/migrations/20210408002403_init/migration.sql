-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'GUEST');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMPTZ NOT NULL,
    "end" TIMESTAMPTZ NOT NULL,
    "customerId" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "type" "Type" NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(25) NOT NULL,
    "password" VARCHAR(60),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringSchedule" (
    "day" "Day" NOT NULL,
    "open" INTEGER NOT NULL DEFAULT 9,
    "close" INTEGER NOT NULL DEFAULT 17,

    PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "ScheduleChanges" (
    "date" DATE NOT NULL,
    "open" INTEGER,
    "close" INTEGER,

    PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.timestamp_unique" ON "Appointment"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.end_unique" ON "Appointment"("end");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("email") ON DELETE CASCADE ON UPDATE CASCADE;
