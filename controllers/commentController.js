const Comment = require("../models/Comment");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Post = require("../models/Post");
const checkPermissions = require("../utils/checkPermissions");

const createComment = async (req, res) => {
  const { post: postId } = req.body;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new CustomError.NotFoundError(`NO POST FOUND`);
  }

  req.body.user = req.user.userId;
  const comment = await Comment.create(req.body);
  res.status(StatusCodes.CREATED).json({ comment });
};

const getAllComments = async (req, res) => {
  const comments = await Comment.find({}).populate("post").populate({
    path: "user",
    select: "name",
  });
  res.status(StatusCodes.OK).json({ comments });
};

const getSingleComment = async (req, res) => {
  const { id: commentId } = req.params;

  const comment = await Comment.findOne({ _id: commentId }).populate({
    path: "user",
    select: "name",
  });

  if (!comment) {
    throw new CustomError.NotFoundError(`NO COMMENT WITH ID ${commentId} `);
  }
  res.status(StatusCodes.OK).json({ comment });
};

const updateComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { comment } = req.body;
  const userComment = await Comment.findOne({ _id: commentId });
  if (!userComment) {
    throw new CustomError.NotFoundError(`NO COMMENT WITH ID ${commentId} `);
  }

  checkPermissions(req.user, userComment.user);

  //Comment model has a property called comment, which we set to what the user is providing
  comment.comment = comment;
  await userComment.save();
  res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const userComment = await Comment.findOne({ _id: commentId });
  if (!userComment) {
    throw new CustomError.NotFoundError(`NO COMMENT WITH ID ${commentId} `);
  }

  checkPermissions(req.user, userComment.user);

  await userComment.remove();
  res.status(StatusCodes.OK).json({ message: "COMMENT DELETED" });
};

module.exports = {
  createComment,
  getAllComments,
  getSingleComment,
  updateComment,
  deleteComment,
};
