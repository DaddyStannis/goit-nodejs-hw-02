const express = require("express");

const { schemas } = require("../../models/users");
const controllers = require("../../controllers/authControllers");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");
const { upload } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);

router.post("/login", validateBody(schemas.loginSchema), controllers.login);

router.post("/logout", authenticate, controllers.logout);

router.get("/current", authenticate, controllers.current);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.changeSubscriptionSchema),
  controllers.changeSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
