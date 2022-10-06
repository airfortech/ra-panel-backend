import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
