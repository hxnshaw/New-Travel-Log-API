const getAllUsers = async (req, res) => {
  res.send("getAllUsers");
};

const getSingleUser = async (req, res) => {
  res.send("getSingleUser");
};

const showUserProfile = async (req, res) => {
  res.send("showUserProfile");
};

const updateUserPassword = async (req, res) => {
  res.send("updateUserPasswords");
};

const updateUserProfile = async (req, res) => {
  res.send("updateUserProfile");
};

const deleteUserAccount = async (req, res) => {
  res.send("deleteUserAccount");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserAccount,
  showUserProfile,
  updateUserPassword,
};
