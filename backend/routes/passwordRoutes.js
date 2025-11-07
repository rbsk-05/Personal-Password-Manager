import express from "express";
import Password from "../models/Password.js";

const router = express.Router();

// ✅ Add a new password
router.post("/add", async (req, res) => {
  try {
    const { website, email, password, notes } = req.body;

    if (!website || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPassword = new Password({
      website,
      email,
      password,
      notes,
    });

    await newPassword.save();
    res.status(201).json({ message: "Password saved successfully", newPassword });
  } catch (error) {
    console.error("Error saving password:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all passwords
router.get("/all", async (req, res) => {
  try {
    const passwords = await Password.find().sort({ createdAt: -1 });
    res.json(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE password by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPassword = await Password.findByIdAndDelete(req.params.id);
    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }
    res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// UPDATE password by ID
router.put("/:id", async (req, res) => {
  const { website, email, password, notes } = req.body;

  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      req.params.id,
      { website, email, password, notes },
      { new: true, runValidators: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


export default router;
