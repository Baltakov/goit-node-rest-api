import { Router } from "express";

import authControllers from "../controllers/authControllers.js";

import validateBody from "../decorators/validateBody.js";

import { authSignupSchema } from "../schemas/authSchemas.js";

import { authenticate } from "../middlewares/checkToken.js";

const signupMiddleware = validateBody(authSignupSchema);

const authRouter = Router();

authRouter.post("/signup", signupMiddleware, authControllers.signup);

authRouter.post("/signin", signupMiddleware, authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrentUser);

export default authRouter;
