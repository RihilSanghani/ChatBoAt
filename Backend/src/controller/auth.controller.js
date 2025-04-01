import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) => {

    const { fullname, email, password } = req.body;

    try {

        if (!fullname || !email || !password) return res.status(400).json({ message: "All fields are required" });

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ fullname, email, password: hashedPassword });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });

        } else {
            return res.status(400).json({ message: "Invalid User Data" });
        }

    } catch (error) {
        console.log("error in signup function: ", error);
        req.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        generateToken(user._id, res);
        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.log("error in login function: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("authToken", "", { maxAge: 0 });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("error in logout function: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    try {

        const { picture } = req.body;
        const userID = req.user._id

        if (!picture) return res.status(400).json({ message: "Picture is required" });

        const uploadedPicture = await cloudinary.uploader.upload(picture);
        const updateUser = await User.findByIdAndUpdate(userID, { picture: uploadedPicture.secure_url }, { new: true });
        res.status(200).json({ message: "Profile updated successfully", user: updateUser });
    } catch (error) {
        console.log("error in edit picture function: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const checkUser = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkUser function: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}