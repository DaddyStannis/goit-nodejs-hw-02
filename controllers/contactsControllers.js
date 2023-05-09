const { Contact } = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

async function getAllContacts(req, res) {
  const data = await Contact.find();
  res.json(data);
}

async function getContact(req, res) {
  const data = await Contact.findById(req.params.id);

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function createContact(req, res) {
  const data = await Contact.create(req.body);
  res.status(201).json(data);
}

async function updateContact(req, res) {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }

  const data = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function updateStatusContact(req, res) {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }

  const data = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function deleteContact(req, res) {
  const data = await Contact.findByIdAndDelete(req.params.id);

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
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
