import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUser } from "../services/authServices.js";
const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401, "Authorization header missing"));
    return;
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Bearer or token invalid"));
    return;
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await findUser({ id });
    if (!user) {
      next(HttpError(401, "User not found"));
      return;
    }
    if (!user.token || user.token !== token) {
      next(HttpError(401, "Token missing or invalid"));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};
