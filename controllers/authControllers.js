const bcrypt = require("bcryptjs");

const { User } = require("../models/users");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { createToken } = require("../helpers");

async function register(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(409, "Email or password is wrong");
  }

  const passwordCompare = bcrypt.compareSync(password, user.password);

  if (!passwordCompare) {
    throw HttpError(409, "Email or password is wrong");
  }

  const token = createToken(user.id);
  user.token = token;
  user.save();

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
}

async function logout(req, res) {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).json();
}

async function current(req, res) {
  res.json({ email: req.user.email, subscription: req.user.subscription });
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};
