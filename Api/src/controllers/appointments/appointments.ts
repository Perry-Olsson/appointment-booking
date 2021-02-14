import express from "express";
import { Appointments } from "../../repositories/Appointments";
import { validateQuery } from "./utils/validateQuery";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = { where: validateQuery(req.query) };
  const appointments = await Appointments.sorted.findMany(query);
  res.json(appointments);
});

export { router as appointmentsRouter };
