const { HttpError } = require("../helpers");

function ctrlWrapper(ctrl) {
  return async function (req, res, next) {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

function validateBody(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
}

module.exports = { ctrlWrapper, validateBody };
