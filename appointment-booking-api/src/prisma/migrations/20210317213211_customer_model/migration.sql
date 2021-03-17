/*
  Warnings:

  - Added the required column `customerId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('USER', 'GUEST');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "customerId" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "type" "Type" NOT NULL DEFAULT E'GUEST',
    "email" VARCHAR(100) NOT NULL,
    "phoneNumber" VARCHAR(25) NOT NULL,
    "password" VARCHAR(60),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("email") ON DELETE CASCADE ON UPDATE CASCADE;
