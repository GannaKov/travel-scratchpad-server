const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: [3, "Too Short!"],
      maxlength: [50, "Too Long!"],
      //required: [true, "Required"],
    },
    email: {
      type: String,
      validate: {
        validator: (value) => {
          return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value);
        },
        message: "Must be a valid email!",
      },
      required: [true, "Required"],
    },

    password: {
      type: String,
      minLength: [6, "Password must be at least 6 digits"],
      required: [true, "Password is required"],
    },
    avatar: { type: String },
  },

  { versionKey: false, timestamps: true },
  { collection: "users" }
);

const User = model("User", userSchema);

// ------------------------------
module.exports = User;
