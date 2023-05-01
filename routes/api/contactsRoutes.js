const express = require("express");
const controllers = require("../../controllers/contactsControllers");
const { schemas: contactsSchemas, schemas } = require("../../models/contacts");
const { validateContact } = require("../../decorators");
const router = express.Router();
const { isValidId } = require("../../middlewares");

router.get("/", controllers.getAllContacts);

router.post(
  "/",
  validateContact(contactsSchemas.createSchema),
  controllers.createContact
);

router.get("/:id", isValidId, controllers.getContact);

router.put(
  "/:id",
  isValidId,
  validateContact(contactsSchemas.updateSchema),
  controllers.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateContact(contactsSchemas.updateStatusSchema),
  controllers.updateStatusContact
);

router.delete("/:id", isValidId, controllers.deleteContact);

module.exports = router;
