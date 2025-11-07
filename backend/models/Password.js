import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", passwordSchema);

export default Password;
