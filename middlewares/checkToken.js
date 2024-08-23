import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { findUser } from "../services/authServices.js";
const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401, "1"));
    return;
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "2"));
    return;
  }
  const { id } = jwt.verify(token, JWT_SECRET);
  const user = await findUser({ id });
  if (!user) {
    next(HttpError(401, "3"));
    return;
  }
  console.log("test", user.token);
  console.log(!user.token);
  console.log(user.token !== token);
  if (!user.token || user.token !== token) {
    next(HttpError(401, "4"));
    return;
  }
  req.user = user;
  next();
};
