import User from "../models/user.model.js";
import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import Budget from "../models/budget.model.js";
import Goal from "../models/goal.model.js";
import jwt from "jsonwebtoken";
import { sendWelcomeEmailViaGmail, sendOTPEmailViaGmail } from "../utils/googleMailer.js";
import { validateEmailDomain } from "../utils/emailValidator.js";


// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
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

  // Upgrade: Perform advanced verification (MX, SMTP, Entropy)
  const validation = await validateEmailDomain(email);
  if (!validation.valid) {
    return res.status(200).json({ invalid: true, message: validation.message });
  }

  try {
    const userExists = await User.findOne({ email });

    let user;
    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({ message: "ID ALREADY INITIALIZED (Email in use)" });
      }
      // If not verified, allow updating details and re-sending OTP
      user = userExists;
      user.fullName = fullName;
      user.password = password;
      user.profileImageUrl = profileImageUrl;
    } else {
      // Create new unverified user
      user = new User({
        fullName,
        email,
        password,
        profileImageUrl,
      });
    }

    // Generate/Refresh OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send verification email
    try {
      await sendOTPEmailViaGmail(user.email, otp);
    } catch (emailErr) {
      console.error("Error sending verification email:", emailErr);
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
      return res.status(401).json({ message: "Authentication failure. Access denied." });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Account not verified. Please verify your email first.",
        isNotVerified: true,
        email: user.email
      });
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

    const [deletedIncomes, deletedExpenses, deletedBudgets, deletedGoals, deletedUser] = await Promise.all([
      Income.deleteMany({ userId }),
      Expense.deleteMany({ userId }),
      Budget.deleteMany({ userId }),
      Goal.deleteMany({ userId }),
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

// Check if Email Exists
export async function checkEmailExists(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Perform advanced verification (MX, SMTP, Entropy)
    const validation = await validateEmailDomain(email);
    if (!validation.valid) {
      return res.status(200).json({ exists: false, invalid: true, message: validation.message });
    }

    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    res.status(500).json({ message: "Error checking email", error: error.message });
  }
}

// Send OTP
export async function sendOTP(req, res) {
  const { email } = req.body;

  try {
    // If user is logged in, use their email if none provided
    const targetEmail = email || (req.user ? (await User.findById(req.user.id))?.email : null);

    if (!targetEmail) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: targetEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendOTPEmailViaGmail(targetEmail, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
}

// Verify OTP
export async function verifyOTP(req, res) {
  const { email, otp } = req.body;

  try {
    const targetEmail = email || (req.user ? (await User.findById(req.user.id))?.email : null);

    if (!targetEmail || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({
      email: targetEmail,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
}

// Verify Sign-Up OTP
export async function verifySignupOTP(req, res) {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
      isVerified: false
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    // Send welcome email after verification
    try {
      await sendWelcomeEmailViaGmail(user);
    } catch (emailErr) {
      console.error("Error sending welcome email:", emailErr);
    }

    res.status(200).json({
      message: "Account verified successfully",
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Error verifying sign-up", error: error.message });
  }
}

// Reset Password (Forgot Password flow)
export async function resetPassword(req, res) {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Security protocol failed. Code mismatch or expired." });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
}

// Update Password (Logged-in User flow)
export async function updatePassword(req, res) {
  const userId = req.user.id;
  const { otp, newPassword } = req.body;

  if (!otp || !newPassword) {
    return res.status(400).json({ message: "OTP and new password are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
}
