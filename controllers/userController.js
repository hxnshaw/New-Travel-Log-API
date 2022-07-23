const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ TOTAL_NO_OF_USERS: users.length, users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`NO USER WITH id:${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const showUserProfile = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.NotFoundError(` USER DOES NOT EXIST`);
  }
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new CustomError.BadRequestError("PLEASE ENTER VALID CREDENTIALS");
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isValidPassword = await user.comparePassword(currentPassword);

  if (!isValidPassword) {
    throw new CustomError.UnauthenticatedError(
      "PLEASE ENTER VALID CREDENTIALS"
    );
  }
  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: "PASSWORD CHANGE SUCCESSFUL" });
};

const updateUserProfile = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    throw new CustomError.BadRequestError("PLEASE ENTER VALID CREDENTIALS");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.email = email;
  user.age = age;

  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ msg: "PROFILE UPDATED SUCCESSFULLY" });
};

// const deleteUserAccount = async (req, res) => {
//   const user = await User.findOneAndDelete({ _id: req.user.userId });
//   res.status(StatusCodes.OK).json({ msg: "PROFILE DELETED SUCCESSFULLY" });
// };
const deleteUserAccount = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  await user.remove();

  res.status(StatusCodes.OK).json({ msg: "PROFILE DELETED SUCCESSFULLY" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserAccount,
  showUserProfile,
  updateUserPassword,
};
