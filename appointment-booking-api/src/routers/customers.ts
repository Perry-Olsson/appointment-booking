import express from "express";
import passport from "passport";
import { CustomerController } from "../controllers";
import { CustomerDataAccess } from "../repositories";

const customerController = new CustomerController(new CustomerDataAccess());

const router = express.Router();

router.post("/", (req, res, next) =>
  customerController.createCustomer(req, res, next)
);

router.post("/login", (req, res, next) =>
  customerController.login(req, res, next)
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => customerController.getProfile(req, res, next)
);

export { router as customerRouter };
