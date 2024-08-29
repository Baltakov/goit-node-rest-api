import {
  listContacts,
  removeContact,
  addContact,
  updateContactService,
  getContact,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const contacts = await listContacts({ owner });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: owner } = req.user;
    const contact = await getContact(id, owner);
    if (!contact) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await removeContact(id);
    if (!contact) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    // const { id: owner } = req.user;
    // const contact = await addContact({ ...req.body, owner });
    // res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "Body must have at least one field");
    }
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { id: owner } = req.user;
    const contact = await updateContactService({ id, owner }, req.body);
    if (!contact) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
