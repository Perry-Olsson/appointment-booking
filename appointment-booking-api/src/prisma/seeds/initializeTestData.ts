import { createAppointments, seedAppointments } from "./appointments";
import { seedCustomers } from "./customers";
import { clearDb } from "./utils";

export default async function main() {
  await clearDb();
  await seedCustomers();
  await seedAppointments(createAppointments(5, 2));
}
