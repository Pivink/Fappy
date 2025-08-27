import User from '../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Route: ",req.body);

    const user = await User.findOne({ email }).select("+password");
    console.log("Find user: ",user);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    const user1= {
        id: user._id,
        username: user.username,
        email: user.email,
      };
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user1,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



export const registration = async (req, res) => {
  try {
    console.log("REgistration Route: ", req.body);
    console.log("ENV: ", process.env.JWT_SECRET)
    const { name, email, password } = req.body;



    if (!name || !email || !password) {
      return res.status(400).json({ error: "Username, Email, and Password are required!" });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      message: "User registered successfully",
      token,
      newUser
    });

  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "Server error during registration!" });
  }
};