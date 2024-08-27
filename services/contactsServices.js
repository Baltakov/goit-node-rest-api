import Contact from "../db/models/contact.js";

export const listContacts = (query) =>
  Contact.findAll({
    where: query,
  });

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export async function removeContact(query) {
  return Contact.destroy({
    where: query,
  });
}

export function addContact({ name, email, phone }) {
  return Contact.create({ name, email, phone });
}

export async function updateContactService(query, contactData) {
  const contact = await getContact(query);
  if (!contact) {
    return null;
  }
  return contact.update(contactData, {
    returning: true,
  });
}
