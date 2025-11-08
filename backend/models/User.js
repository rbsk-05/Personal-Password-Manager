import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passphrase: { type: String, required: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("passphrase")) return next();
  this.passphrase = await bcrypt.hash(this.passphrase, 10);
  next();
});

export default mongoose.model("User", userSchema);
