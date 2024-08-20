import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUser } from "../services/authServices.js";
const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401));
    return;
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
    return;
  }
  const { id } = token.verify(token, JWT_SECRET);
  const user = await findUser({ id });
  if (!user) {
    next(HttpError(401));
    return;
  }
  if (!user.token || user.token !== token) {
    next(HttpError(401));
    return;
  }
  req.user = user;
  next();
};
