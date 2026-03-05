import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "full_name is required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: [true, "avatar is required"],
    },

    coverImage: {
      type: String, // cloudinary url
    },

    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//function for hash the password
UserSchema.pre("saved", async function (next) {
  if (!this.isModified("password")) return next(); // means if the password is modified then run the run,
  this.passsword = await bcrypt.hash(this.password, 10);
  next();
});

// function for decode the password
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.passsword);
};

//function for create the accessToken
UserSchema.methods.GenerateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

//function for create the accessToken
UserSchema.methods.GenerateRefreshToken = async function ()  {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};


export const User = mongoose.model("User", UserSchema);
