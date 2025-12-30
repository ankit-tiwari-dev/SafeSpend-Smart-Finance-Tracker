import User from "../models/user.model.js";
import Expense from "../models/expense.model.js";
import pkg from "jsonwebtoken";
import { sendWelcomeEmailViaGmail } from "../utils/googleMailer.js";

const { sign } = pkg
// Generate JWT token
const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
export async function registerUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { fullName, email, password, profileImageUrl } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Send welcome email on new account creation (email/password registration)
    try {
      await sendWelcomeEmailViaGmail(user);
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
      // Don't block registration if email send fails
    }

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
}

// Login User
export async function loginUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}

// Get User Info
export async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user info", error: error.message });
  }
}

// Delete User Account
export async function deleteAccount(req, res) {
  try {
    const userId = req.user.id;

    const [deletedIncomes, deletedExpenses, deletedUser] = await Promise.all([
      deleteMany({ userId }),
      Expense.deleteMany({ userId }),
      User.findByIdAndDelete(userId),
    ]);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting account", error: error.message });
  }
}

// Update User Profile
export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;
    const {
      fullName,
      bio,
      gender,
      dob,
      phone,
      address,
      city,
      state,
      country,
      zip,
      profileImageUrl,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        gender,
        dob,
        phone,
        address,
        city,
        state,
        country,
        zip,
        profileImageUrl,
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
}
