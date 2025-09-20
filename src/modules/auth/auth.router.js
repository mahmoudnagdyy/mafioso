import { Router } from "express";
import * as authController from "./controller/auth.controller.js";
import { validationMiddleware } from "../../middleware/validation.js";
import * as authValidators from "./auth.validationSchema.js";

const router = Router();

router.post(
    "/signup",
    validationMiddleware(authValidators.signupSchema),
    authController.signup
);

router.get("/confirmEmail/:token", authController.confirmEmail);

router.post(
    "/login",
    validationMiddleware(authValidators.loginSchema),
    authController.login
);

export default router;
