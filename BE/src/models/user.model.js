import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 0,
      required: false
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpire: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("UserCollection", UserSchema)
export default UserModel