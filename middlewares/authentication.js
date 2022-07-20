const CustomError = require("../errors");
const { isValidToken } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }

  try {
    const { name, userId, role, email } = isValidToken({ token });
    req.user = { name, userId, role, email };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("INVALID AUTHENTICATION");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "UNAUTHORIZED TO ACCESS THIS ROUTE."
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
