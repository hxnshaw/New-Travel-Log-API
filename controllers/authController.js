const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

//USER REGISTRATION
const register = async (req, res) => {
  const { name, email, age, password } = req.body;

  const alreadyRegistered = await User.findOne({ email });

  if (alreadyRegistered) {
    throw new CustomError.BadRequestError("Email already registered");
  }

  //MAKE FIRST REGISTERED ACCOUNT THE ADMIN
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, age, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //Check if the user submitted an empty form.
  if (!email || !password) {
    throw new CustomError.BadRequestError("PLEASE PROVIDE EMAIL AND PASSWORD");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("NO USER FOUND");
  }

  const passwordIsCorrect = await user.comparePassword(password);

  if (!passwordIsCorrect) {
    throw new CustomError.BadRequestError(
      "INVALID CREDENTIALS. PLEASE CHECK EMAIL AND PASSWORD"
    );
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ msg: "Success", user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()), //Removes the token from the user object.
  });
  res.status(StatusCodes.OK).json({ msg: "Success" });
};

module.exports = {
  register,
  login,
  logout,
};
