import { User } from "../models/user.js";
import { handleError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register a user
const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      const missingFields = [];
      if (!username) missingFields.push("Username");
      if (!email) missingFields.push("Email");
      if (!password) missingFields.push("Password");

      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} ${
          missingFields.length === 1 ? "is" : "are"
        } required`,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or username already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    const createdUser = await User.create(newUser);

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    const userResponse = {
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
    };

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
      data: userResponse,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// login a user
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const missingFields = [];
      if (!email) missingFields.push('Email');
      if (!password) missingFields.push('Password');
      
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(', ')} ${missingFields.length === 1 ? 'is' : 'are'} required`,
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      data: userResponse
    });

  } catch (error) {
    handleError(error, res);
  }
};

export const AUTH = {
  handleRegister,
  handleLogin,
};
