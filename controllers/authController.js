const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { name, email, age, password } = req.body;

  const alreadyRegistered = await User.findOne({ email });

  if (alreadyRegistered) {
    throw new CustomError.BadRequestError("Email already registered");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, age, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("LoginUser");
};

const logout = async (req, res) => {
  res.send("LogoutUser");
};

module.exports = {
  register,
  login,
  logout,
};
