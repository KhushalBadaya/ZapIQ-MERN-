import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const signup = async(req,res) =>{
    const {fullName,email,password} = req.body;
    try {
        if(!fullName || !email || !password ){
            return res.status(400).json({message : "All feilds required"});
        }
        if(password.length()<6){
            return res.status(400).json({message:"Password should be 6 characters or more"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"Email Already Existed"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        const savedUser = await  newUser.save()
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id:savedUser._id,
            fullName:savedUser.fullName,
            email:savedUser.email,
            profilePic:savedUser.profilePic
        })
    } catch (error) {
        console.log("Signup Error",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}   