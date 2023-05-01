const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const createSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
  }),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": `missing field "favorite"` }),
});

schema.post("save", handleMongooseError);

const Contact = model("contacts", schema);

const schemas = {
  createSchema,
  updateSchema,
  updateStatusSchema,
};

module.exports = { Contact, schemas };
