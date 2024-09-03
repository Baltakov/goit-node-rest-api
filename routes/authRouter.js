import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema, authEmailSchema } from "../schemas/authSchemas.js";

import { authenticate } from "../middlewares/checkToken.js";

import upload from "../middlewares/upload.js";

const signupMiddleware = validateBody(authSignupSchema);
const verifyEmailMiddleware = validateBody(authEmailSchema);

const authRouter = Router();

authRouter.post("/register", signupMiddleware, authControllers.signup);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post("/verify", verifyEmailMiddleware, authControllers.resendVerify);

authRouter.post("/login", signupMiddleware, authControllers.signin);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
