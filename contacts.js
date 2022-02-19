const fs = require("fs/promises");
const path = require("path");
const { randomUUID } = require("crypto");
const ct = require("./db/contacts.json"); //object

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "./db/contacts.json"),
    "utf8"
  ); // string
  const result = JSON.parse(content);
  return result;
};

async function listContacts() {
  return await readContent();
}

async function getContactById(contactId) {
  const contacts = await readContent();
  const [contact] = contacts.filter((c) => c.id === contactId);
  return contact ? contact : null;
}

async function removeContact(id) {
  const contacts = await readContent();
  const newList = [];
  for (const contact of contacts) {
    if (contact.id !== id) {
      newList.push(contact);
    }
  }
  await fs.writeFile(
    path.join(__dirname, "contact.json"),
    JSON.stringify(newList, null, 2)
  );
  return newList;
}

async function addContact(name, email, phone) {
  const contacts = await readContent();
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contact.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
