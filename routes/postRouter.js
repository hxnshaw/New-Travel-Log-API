const express = require("express");
const router = express.Router();
const {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  uploadImage,
} = require("../controllers/postController");

router.route("/").post(createPost).get(getAllPosts);

router.route("/uploadImage").post(uploadImage);

router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

module.exports = router;
