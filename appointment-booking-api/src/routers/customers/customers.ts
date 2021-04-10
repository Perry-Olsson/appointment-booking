import express from "express";
import passport from "passport";
import { customerController } from "../../controllers";

const router = express.Router();

router.post("/", customerController.createCustomer);

router.post("/login", customerController.login);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  customerController.getProfile
);

export { router as customersRouter };
