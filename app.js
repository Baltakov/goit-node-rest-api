import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import nodemailer from "nodemailer";

import sequelize from "./db/sequelize.js";

import authRouter from "./routes/authRouter.js";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

const { UKR_NET_PASSWORD, UKR_NET_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_FROM,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  from: UKR_NET_FROM,
  to: "godoyan906@esterace.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const { SERVER_PORT } = process.env;
const port = Number(SERVER_PORT);

try {
  await sequelize.authenticate();
  console.log("Success connect to DB");
  // await sequelize.sync({ force: true });
  app.listen(port, () => {
    console.log(`Server is running. Use our API on port: ${port}`);
  });
} catch (error) {
  console.log(error.message);
}

export default app;
