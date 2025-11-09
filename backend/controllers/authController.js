import User from "../models/User.js";
import bcrypt from "bcrypt";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, passphrase } = req.body;

    if (!name || !email || !passphrase)
      return res.status(400).json({ error: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already exists" });

    const hashedPass = await bcrypt.hash(passphrase, 10);
    const newUser = new User({ name, email, passphrase: hashedPass });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login user by passphrase only
export const loginUser = async (req, res) => {
  try {
    const { passphrase } = req.body;
    if (!passphrase) return res.status(400).json({ error: "Passphrase is required" });

    const trimmedPass = passphrase.trim();
    console.log("🔍 Incoming Passphrase:", JSON.stringify(trimmedPass));

    const users = await User.find({});
    let matchedUser = null;

    for (const user of users) {
      console.log("Checking against user:", user.email);
      const isMatch = await bcrypt.compare(trimmedPass, user.passphrase);
      console.log("Compare result:", isMatch);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser)
      return res.status(401).json({ error: "Invalid passphrase" });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: matchedUser._id,
        name: matchedUser.name,
        email: matchedUser.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
