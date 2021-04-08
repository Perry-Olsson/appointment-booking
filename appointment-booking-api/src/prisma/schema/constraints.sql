ALTER TABLE "RecurringSchedule" ADD CONSTRAINT day_check CHECK(day >= 0 AND day <= 6);
ALTER TABLE "RecurringSchedule" ADD CONSTRAINT open_check CHECK(open >= 0 AND open <= 23);
ALTER TABLE "RecurringSchedule" ADD CONSTRAINT close_check CHECK(close >= 0 AND close <= 23);