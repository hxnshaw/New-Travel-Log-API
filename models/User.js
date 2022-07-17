const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "PLEASE PROVIDE A NAME"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "PLEASE ENTER YOUR EMAIL ADDRESS"],
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "PLEASE ENTER VALID CREDENTIALS",
      },
    },
    password: {
      type: String,
      required: [true, "PLEASE ENTER YOUR PASSWORD"],
      trim: true,
      minlength: 7,
    },
    age: {
      type: Number,
      required: [true, "PLEASE ENTER YOUR AGE"],
      validate(value) {
        if (value < 18) {
          throw new Error("YOU MUST BE AGE 18 AND ABOVE TO REGISTER");
        }
      },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
