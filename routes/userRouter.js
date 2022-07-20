const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");
const {
  getAllUsers,
  getSingleUser,
  updateUserProfile,
  deleteUserAccount,
  showUserProfile,
  updateUserPassword,
} = require("../controllers/userController");

router
  .route("/")
  .get([authenticateUser, authorizePermissions("admin")], getAllUsers);

router.route("/myProfile").get(authenticateUser, showUserProfile);

router.route("/updateMyProfile").patch(authenticateUser, updateUserProfile);

router.route("/updateMyPassword").patch(authenticateUser, updateUserPassword);

router
  .route("/deleteMyAccount")
  .delete(
    [authenticateUser, authorizePermissions("admin", "user")],
    deleteUserAccount
  );

router
  .route("/:id")
  .get([authenticateUser, authorizePermissions("admin")], getSingleUser);

module.exports = router;
