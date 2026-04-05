import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const checkAuth = async (req, res) => {
  try {
    // req.user comes from protectedRoute middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const signup = async (req, res) => {
  const { fullName, username, email, password } = req.body;
  try {
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: "All feilds required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be 6 characters or more" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Existed" });
    }
    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ message: "Username Already Existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      username: savedUser.username,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
    });
  } catch (error) {
    console.log("Signup Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if ((!email|| !password))
      return res.status(400).json({ message: "All feilds Required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not exist!" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Login Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0, sameSite: "none", secure: true });
  res.status(200).json({ message: "Logout Successfu lly" });
};

export const updateProfile = async(req,res)=>{
  try {
    const { profilePic, fullName, username, currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = {};

    // Basic details
    if (fullName) updates.fullName = fullName;
    if (username) {
      // Check if username is taken by someone else
      const existing = await User.findOne({ username });
      if (existing && existing._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      updates.username = username;
    }

    // Password Update
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "New password must be at least 6 characters" });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    } else if (newPassword && !currentPassword) {
      return res.status(400).json({ message: "Please provide your current password to set a new one" });
    }

    // Profile Picture via Cloudinary
    if (profilePic && profilePic.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updates.profilePic = uploadResponse.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}