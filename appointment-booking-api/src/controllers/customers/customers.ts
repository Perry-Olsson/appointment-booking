import express from "express";
import { prisma } from "../../prisma";
import { customer } from "../../repositories/customer";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const newCustomer = await customer.initialize(req.body);
    const createdCustomer = await prisma.customer.create({
      data: newCustomer,
      select: customer.createSelectStatement,
    });

    res.json(createdCustomer);
  } catch (err) {
    next(err);
  }
});

export { router as customersRouter };
