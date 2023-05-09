const { Contact } = require("../models/contacts");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

async function getAllContacts(req, res) {
  const { _id: owner } = req.user;
  const { page = 1, limit = Infinity, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const searchParams = favorite ? { owner, favorite } : { owner };
  const data = await Contact.find(searchParams, "", { skip, limit }).populate(
    "owner",
    "email subscription -_id"
  );
  res.json(data);
}

async function getContact(req, res) {
  const { _id: owner } = req.user;
  const data = await Contact.findOne({ _id: req.params.id, owner }).populate(
    "owner",
    "email subscription -_id"
  );

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function createContact(req, res) {
  const { _id: owner } = req.user;
  const data = await Contact.create({ ...req.body, owner });
  res.status(201).json(data);
}

async function updateContact(req, res) {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }

  const { _id: owner } = req.user;
  const data = await Contact.findOneAndUpdate(
    { _id: req.params.id, owner },
    req.body,
    { new: true }
  );

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function updateStatusContact(req, res) {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "missing fields");
  }

  const { _id: owner } = req.user;
  const data = await Contact.findOneAndUpdate(
    { _id: req.params.id, owner },
    req.body,
    { new: true }
  );

  if (!data) {
    throw HttpError(404);
  }

  res.json(data);
}

async function deleteContact(req, res) {
  const { _id: owner } = req.user;
  const data = await Contact.findOneAndDelete({ _id: req.params.id, owner });

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
