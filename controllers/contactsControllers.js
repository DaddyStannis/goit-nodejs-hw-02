const services = require("../models/contacts");
const HttpError = require("../helpers");
const { ctrlWrapper } = require("../decorators");

async function getAllContacts(req, res) {
  const data = await services.listContacts();
  res.json(data);
}

async function getContact(req, res) {
  const data = await services.getContactById(req.params.contactId);

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function createContact(req, res) {
  const data = await services.addContact(req.body);
  res.status(201).json(data);
}

async function updateContact(req, res) {
  const data = await services.updateContact(req.params.contactId, req.body);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json(data);
}

async function deleteContact(req, res) {
  const data = await services.removeContact(req.params.contactId);

  if (!data) {
    throw HttpError(404);
  }

  res.status(200).json({ message: "contact deleted" });
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContact: ctrlWrapper(getContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
