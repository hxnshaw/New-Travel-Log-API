const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserAccount,
  showUserProfile,
  updateUserPassword,
} = require("../controllers/userController");

router.route("/").get(getAllUsers);

router.route("/myProfile").get(showUserProfile);

router.route("/updateMyProfile").patch(updateUserProfile);

router.route("/updateMyPassword").patch(updateUserPassword);

router.route("/deleteMyAccount").delete(deleteUserAccount);

router.route("/:id").get(getSingleUser);

module.exports = router;
