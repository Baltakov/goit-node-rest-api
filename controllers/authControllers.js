import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import path from "path";
import fs from "node:fs/promises";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

import { listContacts } from "../services/contactsServices.js";
import { rename } from "fs";

// import { useInflection } from "sequelize";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const avatarURL = gravatar.url(req.body.email);
  const userData = { ...req.body, avatarURL };
  const newUser = await authServices.signup(userData);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await authServices.updateUser({ id: user.id }, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};
const getCurrentUser = async (req, res) => {
  const { email, id } = req.user;
  const contacts = await listContacts({ owner: id });
  res.json({ email, contacts });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });
  res.json({ message: "Logout success" });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file");
  }
  const { path: tempPath, originalname } = req.file;
  const fileName = `${req.user.id}_${originalname}`;
  const resultPath = path.resolve("public", "avatars", fileName);
  await fs.rename(tempPath, resultPath);
  const avatarURL = path.join("avatar", fileName);
  await authServices.updateUser({ id: req.user.id }, { avatarURL });
  res.json({ avatarURL: avatarURL });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
