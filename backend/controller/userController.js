const express = require('express');
const User = require('../models/user');
const { uploadImage } = require('../service/imageUploadService');
const hashPassword  = require('../middleware/hashPassword');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
   const {name, email, password} = req.body;
//    const profileImage = req.file.path;
   try{
    // let profileImageUrl = null;

    // if (profileImage) {
    //     profileImageUrl = await uploadImage(profileImage, "profile_image");
    // }
    
    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({code:"EMAIL_EXISTS", message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({name, email, password: hashedPassword});
    return res.status(200).json({ message: "User registered successful"})
   }
   catch (err) {
    res.status(500).json({ message: err.message });
    } 
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res.status(400).json({code:"USER_NOT_FOUND", message: "User not found" });
            }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({code:"INVALID_PASSWORD", message: "Invalid password" });
        }
        const token = jwt.sign(
            { userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
            );
            res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/"
            });
            const data = {
                name: user.name,
                email: user.email,
            } 
        res.status(200).json({ message: "logged in successfully", data });
    }
    catch (err) {
        res.status(500).json({ 
            code: "SERVER_ERROR",
            message: "Something went wrong. Please try again later." });
    }
}

//getuserbyid
const getUserById = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-posts").select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//updateprofile
const updateProfile = async (req, res) => {
    const userId = req.user.userId;
    const { name, title, bio } = req.body;
    const profileImage = req.files?.profileImage?.[0]?.path;


    try {
    let profileImageUrl = null;

    if (profileImage) {
        
        profileImageUrl = await uploadImage(profileImage, "profileImage");
    }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name || user.name;
        user.title = title || user.title;
        user.bio = bio || user.bio;
        if (profileImage) {
            user.profileImage = profileImageUrl;
        }

        await user.save();
        res.status(200).json({ message: "Profile updated successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    register, 
    login,
    getUserById,
    updateProfile
};
