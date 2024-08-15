import Contact from "../db/models/contact.js";

export function listContacts() {
  Contact.findAll();
}

export function getContactById(contactId) {
  Contact.findByPk(id);
}

export async function removeContact(contactId) {
  Contact.destroy({
    where: {
      contactId,
    },
  });
}

export function addContact({ name, email, phone }) {
  Contact.create({ name, email, phone });
}

export async function updateContactService(id, contactData) {
  Contact.update(contactData, {
    where: {
      id,
    },
  });
}
