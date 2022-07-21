const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication");
const {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  uploadImage,
} = require("../controllers/postController");

router
  .route("/")
  .post(authenticateUser, createPost)
  .get(authenticateUser, getAllPosts);

router.route("/uploadImage").post(authenticateUser, uploadImage);

router
  .route("/:id")
  .get(authenticateUser, getSinglePost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);

module.exports = router;
