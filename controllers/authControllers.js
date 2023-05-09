const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const path = require("path");

const { User } = require("../models/users");
const { ctrlWrapper } = require("../decorators");
const { createToken, moveFile, resizeImg, HttpError } = require("../helpers");

const avatarsDirPath = path.resolve("public", "avatars");

async function register(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const avatarURL = gravatar.url(email, { size: 250 });

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashedPassword,
  });

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

async function changeSubscription(req, res) {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
}

async function updateAvatar(req, res) {
  await moveFile(req.file, avatarsDirPath);
  await resizeImg(path.join(avatarsDirPath, req.file.filename));
  const { _id } = req.user;
  const avatarURL = path.join("avatars", req.file.filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  changeSubscription: ctrlWrapper(changeSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
