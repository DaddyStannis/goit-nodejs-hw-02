const express = require("express");
const controllers = require("../../controllers/contactsControllers");
const { schemas: contactsSchemas } = require("../../models/contacts");
const { validateBody } = require("../../decorators");
const router = express.Router();
const { isValidId, authenticate } = require("../../middlewares");

router.use(authenticate);

router.get("/", controllers.getAllContacts);

router.post(
  "/",

  validateBody(contactsSchemas.createSchema),
  controllers.createContact
);

router.get("/:id", isValidId, controllers.getContact);

router.put(
  "/:id",

  isValidId,
  validateBody(contactsSchemas.updateSchema),
  controllers.updateContact
);

router.patch(
  "/:id/favorite",

  isValidId,
  validateBody(contactsSchemas.updateStatusSchema),
  controllers.updateStatusContact
);

router.delete("/:id", isValidId, controllers.deleteContact);

module.exports = router;
