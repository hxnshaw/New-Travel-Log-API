const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  res.send("RegisterUser");
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
