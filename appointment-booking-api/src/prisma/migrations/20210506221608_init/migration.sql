-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'GUEST');

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "end" TIMESTAMPTZ(6) NOT NULL,
    "procedure_id" VARCHAR(100) NOT NULL,
    "provider_id" VARCHAR(100) NOT NULL,
    "customer_id" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token_version" INTEGER NOT NULL DEFAULT 0,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "type" "Type" NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(25) NOT NULL,
    "password" VARCHAR(60),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "email" VARCHAR(100) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "bio" TEXT,

    PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "schedules" (
    "id" SERIAL NOT NULL,
    "provider_id" VARCHAR(100) NOT NULL,
    "sunday" CHAR(6)[],
    "monday" CHAR(6)[],
    "tuesday" CHAR(6)[],
    "wednesday" CHAR(6)[],
    "thursday" CHAR(6)[],
    "friday" CHAR(6)[],
    "saturday" CHAR(6)[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "procedures" (
    "name" VARCHAR(100) NOT NULL,
    "duration" SMALLINT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "service_hours" (
    "day" INTEGER NOT NULL,
    "open" CHAR(5) NOT NULL DEFAULT E'09:00',
    "close" CHAR(5) NOT NULL DEFAULT E'18:00',
    "is_closed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("day")
);

-- CreateTable
CREATE TABLE "test" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TIME NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProcedureToProvider" (
    "A" VARCHAR(100) NOT NULL,
    "B" VARCHAR(100) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "appointments.timestamp_unique" ON "appointments"("timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "appointments.end_unique" ON "appointments"("end");

-- CreateIndex
CREATE UNIQUE INDEX "customers.email_unique" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schedules.provider_id_unique" ON "schedules"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProcedureToProvider_AB_unique" ON "_ProcedureToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ProcedureToProvider_B_index" ON "_ProcedureToProvider"("B");

-- AddForeignKey
ALTER TABLE "appointments" ADD FOREIGN KEY ("procedure_id") REFERENCES "procedures"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD FOREIGN KEY ("provider_id") REFERENCES "providers"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD FOREIGN KEY ("customer_id") REFERENCES "customers"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD FOREIGN KEY ("provider_id") REFERENCES "providers"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProvider" ADD FOREIGN KEY ("A") REFERENCES "procedures"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProcedureToProvider" ADD FOREIGN KEY ("B") REFERENCES "providers"("email") ON DELETE CASCADE ON UPDATE CASCADE;
