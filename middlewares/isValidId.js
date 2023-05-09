const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/");

function isValidId(req, res, next) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    next(HttpError(404, `"${id}" is not valid id format.`));
  }
  next();
}

module.exports = isValidId;
