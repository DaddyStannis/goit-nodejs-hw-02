const JWT = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

function createToken(id) {
  return JWT.sign(
    {
      id,
    },
    SECRET_KEY,
    { expiresIn: "7D" }
  );
}

module.exports = createToken;
