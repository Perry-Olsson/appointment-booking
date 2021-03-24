import express from "express";
import { prisma } from "../../prisma";
import { Customer } from "../../repositories/Customer";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newCustomer = await Customer.initialize(req.body);
    const createdCustomer = await prisma.customer.create({
      data: newCustomer,
      select: Customer.createSelectStatement,
    });

    res.json(createdCustomer);
  } catch (err) {
    next(err);
  }
});

export { router as customersRouter };
