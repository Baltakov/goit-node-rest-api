import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

import contactsRouter from "./routes/contactsRouter.js";
import usersRouter from "./routes/usersRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { DATABASE_HOST, SERVER_PORT } = process.env;

const connection = mongoose.connect(DATABASE_HOST);

const port = Number(SERVER_PORT);

connection;
try {
  await sequelize.authenticate();
  console.log("Success connect to DB");
  app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
} catch (error) {
  console.log(error.message);
}
