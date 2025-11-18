import { User } from "../models/user";
import { handleError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// register a user
const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password are required",
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

const handleLogin = async (req, res) => {
  try {
  } catch (error) {}
};

export const AUTH = {
  handleRegister,
  handleLogin,
};
