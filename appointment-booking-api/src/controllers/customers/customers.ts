import express from "express";
import { customer } from "../../repositories/customer";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newCustomer = await customer.initialize(req.body);
    const response = await customer.create(newCustomer);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const response = await customer.login(req.body);

    res.json(response);
  } catch (err) {
    next(err);
  }
});

export { router as customersRouter };
