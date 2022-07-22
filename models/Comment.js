const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
