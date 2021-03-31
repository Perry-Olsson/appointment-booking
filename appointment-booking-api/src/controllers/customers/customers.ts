import express from "express";
import passport from "passport";
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

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (err) {
      next(err);
    }
  }
);

export { router as customersRouter };
