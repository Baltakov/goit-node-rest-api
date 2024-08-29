import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} from "../controllers/contactsControllers.js";
import { authenticate } from "../middlewares/checkToken.js";
import upload from "../middlewares/upload.js";
import validateBody from "../decorators/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

const addContactMiddleware = validateBody(createContactSchema);
const updateContactMiddleware = validateBody(updateContactSchema);

contactsRouter.use(authenticate);

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact); // moviesControllers.getMovies

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post(
  "/",
  upload.single("avatar"),
  addContactMiddleware,
  createContact
);

contactsRouter.put("/:id", updateContactMiddleware, updateContact);

export default contactsRouter;
