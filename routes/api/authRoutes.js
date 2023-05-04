const express = require("express");
const { schemas } = require("../../models/users");
const controllers = require("../../controllers/authControllers");
const { validateBody } = require("../../decorators");
const { authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllers.register
);

router.post("/login", validateBody(schemas.loginSchema), controllers.login);

router.post("/logout", authenticate, controllers.logout);

router.get("/current", authenticate, controllers.current);

module.exports = router;
