const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLEASE PROVIDE THE NAME OF THE LOCATION"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      required: [
        true,
        "PLEASE PROVIDE THE DETAILS AND DESCRIPTION OF THE LOCATION",
      ],
      minlength: 10,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: [true, "PLEASE PROVIDE IMAGES FOR THE LOCATION"],
      default: "/uploads/blogger.jpeg",
    },
    recommended: {
      type: Boolean,
      required: true,
      default: false,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PostSchema.virtual("comment", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

module.exports = mongoose.model("Post", PostSchema);
