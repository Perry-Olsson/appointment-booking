-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'GUEST');

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "end" TIMESTAMPTZ(6) NOT NULL,
    "procedureId" VARCHAR(100) NOT NULL,
    "providerId" VARCHAR(100) NOT NULL,
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
CREATE TABLE "Provider" (
    "email" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "bio" TEXT,

    PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "providerId" VARCHAR(100) NOT NULL,
    "Sunday" VARCHAR(15)[],
    "Monday" VARCHAR(15)[],
    "Tuesday" VARCHAR(15)[],
    "Wednesday" VARCHAR(15)[],
    "Thursday" VARCHAR(15)[],
    "Friday" VARCHAR(15)[],
    "Saturday" VARCHAR(15)[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedure" (
    "name" VARCHAR(100) NOT NULL,
    "duration" SMALLINT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ServiceHours" (
    "day" INTEGER NOT NULL,
    "open" CHAR(5) NOT NULL DEFAULT E'09:00',
    "close" CHAR(5) NOT NULL DEFAULT E'18:00',
    "isClosed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "time" TIME NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcedureToProvider" (
    "A" VARCHAR(100) NOT NULL,
    "B" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.timestamp_unique" ON "Appointment"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.end_unique" ON "Appointment"("end");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_providerId_unique" ON "Schedule"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProcedureToProvider_AB_unique" ON "_ProcedureToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcedureToProvider_B_index" ON "_ProcedureToProvider"("B");

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("procedureId") REFERENCES "Procedure"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("providerId") REFERENCES "Provider"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD FOREIGN KEY ("providerId") REFERENCES "Provider"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProvider" ADD FOREIGN KEY ("A") REFERENCES "Procedure"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProvider" ADD FOREIGN KEY ("B") REFERENCES "Provider"("email") ON DELETE CASCADE ON UPDATE CASCADE;
