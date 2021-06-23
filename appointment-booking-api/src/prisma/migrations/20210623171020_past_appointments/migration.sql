-- CreateTable
CREATE TABLE "past_appointments" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) NOT NULL,
    "end" TIMESTAMPTZ(6) NOT NULL,
    "comments" TEXT,
    "procedure_id" VARCHAR(100) NOT NULL,
    "provider_id" VARCHAR(100) NOT NULL,
    "customer_id" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "past_appointments" ADD FOREIGN KEY ("procedure_id") REFERENCES "procedures"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "past_appointments" ADD FOREIGN KEY ("provider_id") REFERENCES "providers"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "past_appointments" ADD FOREIGN KEY ("customer_id") REFERENCES "customers"("email") ON DELETE CASCADE ON UPDATE CASCADE;
