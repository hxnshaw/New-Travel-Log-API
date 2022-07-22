const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const checkPermissions = require("../utils/checkPermissions");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
  req.body.user = req.user.userId;
  const post = await Post.create({ ...req.body, creator: req.user.userId });
  console.log(req.user);
  res.status(StatusCodes.CREATED).json({ post });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId }).populate({
    path: "comment",
    select: "user comment",
  });
  res.status(StatusCodes.OK).json({ post });
};

const getAllPosts = async (req, res) => {
  const posts = await Post.find({}).populate({
    path: "creator",
    select: "name",
  });
  res.status(StatusCodes.OK).json({ posts });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { name, description, recommended } = req.body;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`NO PRODUCT WITH ID ${postId}`);
  }
  checkPermissions(req.user, post.creator);

  post.name = name;
  post.description = description;
  post.recommended = recommended;

  await post.save();
  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`NO PRODUCT WITH ID ${postId}`);
  }
  checkPermissions(req.user, post.creator);
  await post.remove();
  res.status(StatusCodes.OK).json({ message: "POST DELETED" });
};

const uploadImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Travel-Log",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  createPost,
  getSinglePost,
  getAllPosts,
  updatePost,
  deletePost,
  uploadImage,
};
