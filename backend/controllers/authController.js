import User from "../models/User.js";
import bcrypt from "bcrypt";

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
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { passphrase } = req.body;
    if (!passphrase)
      return res.status(400).json({ error: "Passphrase required" });

    const users = await User.find({}); // fetch all users

    for (const user of users) {
      const isMatch = await bcrypt.compare(passphrase, user.passphrase);
      if (isMatch) {
        return res.status(200).json({
          message: "Login successful",
          user: { name: user.name, email: user.email },
        });
      }
    }

    return res.status(401).json({ error: "Invalid passphrase" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-passphrase -__v"); 
    // hide hashed passphrase and version key
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
