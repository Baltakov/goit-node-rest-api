import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

import { authenticate } from "../middlewares/checkToken.js";

import upload from "../middlewares/upload.js";

const signupMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/register", signupMiddleware, authControllers.signup);

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
