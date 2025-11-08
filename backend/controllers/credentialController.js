import Credential from "../models/Credential.js";

// Add credential
export const addCredential = async (req, res) => {
  try {
    const { userId, title, type, website, email, password, notes } = req.body;
    if (!userId || !title || !password)
      return res.status(400).json({ error: "Missing required fields" });

    if (type === "website" && (!website || !email)) {
      return res.status(400).json({ error: "Website and email are required" });
    }

    const newCred = new Credential({
      userId,
      title,
      type,
      website: type === "website" ? website : "",
      email: type === "website" ? email : "",
      password,
      notes,
    });

    await newCred.save();
    res.status(201).json({ message: "Credential saved successfully!", credential: newCred });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Get all credentials by user
export const getCredentials = async (req, res) => {
  try {
    const { userId } = req.params;
    const creds = await Credential.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(creds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update credential
export const updateCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Credential.findByIdAndUpdate(id, updates, { new: true });
    if (!updated) return res.status(404).json({ error: "Credential not found" });

    res.status(200).json({ message: "Credential updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete credential
export const deleteCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Credential.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Credential not found" });

    res.status(200).json({ message: "Credential deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
