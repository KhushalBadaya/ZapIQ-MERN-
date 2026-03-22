import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All feilds required" });
    }
    if (password.length() < 6) {
      return res
        .status(400)
        .json({ message: "Password should be 6 characters or more" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);

    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
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
<<<<<<< HEAD
    if ((!email|| !password))
=======
    if ((!email, !password))
>>>>>>> 17c1607a961186de83576b79f35f15867527e515
      return res.status(400).jsonn({ message: "All feilds Required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).jsonn({ message: "User not exist!" });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
<<<<<<< HEAD
      return res.status(400).jsonn({ message: "Invalid Credentials" });
=======
      return res.status(400).jsonn({ message: "Invaild Credentials" });
>>>>>>> 17c1607a961186de83576b79f35f15867527e515
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
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
<<<<<<< HEAD
  res.status(200).json({ message: "Logout Successfu lly" });
=======
  res.status(200).json({ message: "Logout Successfully" });
>>>>>>> 17c1607a961186de83576b79f35f15867527e515
};

export const updateProfile = async(req,res)=>{
    try {
       const {profilePic} = req.body;
<<<<<<< HEAD
    if(!profilePic) return res.status(400).json({message:"Profile pic is required" });
=======
    if(!profilePic) return res.stauts(400).json({message:"Profile pic is required" });
>>>>>>> 17c1607a961186de83576b79f35f15867527e515
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}