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
    const token =
      createdCustomer.type === "USER"
        ? customer.createToken(createdCustomer.email)
        : null;

    res.json({ customer: createdCustomer, token });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const loggedUser = await customer.login(req.body);

    res.json(loggedUser);
  } catch (err) {
    next(err);
  }
});

export { router as customersRouter };
