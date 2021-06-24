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

router.get("/user", (req, res, next) =>
  customerController.getUser(req, res, next)
);

router.post("/refreshToken", (req, res, next) =>
  customerController.refreshToken(req, res, next)
);

router.post("/logout", (req, res, next) =>
  customerController.logout(req, res, next)
);

router.get(
  "/pastAppointments",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => customerController.getPastAppointments(req, res, next)
);

export { router as customerRouter };
