import mongoose from "mongoose";

const credentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["website", "personal"], default: "personal" },
  website: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, required: true },
  notes: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Credential", credentialSchema);
