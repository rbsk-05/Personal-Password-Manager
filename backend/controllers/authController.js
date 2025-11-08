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

    // Compare passphrase with **all users**
    const users = await User.find({});
    let matchedUser = null;

    for (const user of users) {
      const isMatch = await bcrypt.compare(passphrase, user.passphrase);
      if (isMatch) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser)
      return res.status(401).json({ error: "Invalid passphrase" });

    res.status(200).json({
      message: "Login successful",
      user: { name: matchedUser.name, email: matchedUser.email, _id: matchedUser._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
