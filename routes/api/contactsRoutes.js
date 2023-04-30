const express = require("express");
const controllers = require("../../controllers/contactsControllers");
const { contactsSchemas } = require("../../schemas");
const { validateContact } = require("../../decorators");
const router = express.Router();

router.get("/", controllers.getAllContacts);
router.post(
  "/",
  validateContact(contactsSchemas.createSchema),
  controllers.createContact
);
router.get("/:contactId", controllers.getContact);
router.put(
  "/:contactId",
  validateContact(contactsSchemas.updateSchema),
  controllers.updateContact
);
router.delete("/:contactId", controllers.deleteContact);

module.exports = router;
