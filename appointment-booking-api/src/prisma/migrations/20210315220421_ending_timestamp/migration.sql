/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[end]` on the table `Appointment`. If there are existing duplicate values, the migration will fail.
  - Added the required column `end` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "end" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Appointment.end_unique" ON "Appointment"("end");
