// controllers/uploadController.js
import { User } from "../models/user.js";
import { handleError } from "../utils/error.js";

const singleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    // Update user with avatar (example)
    const userId = req.userInfo.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        avatar: req.file.filename,
        avatarPath: req.file.path 
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        user: updatedUser
      }
    });

  } catch (error) {
    handleError(error, res);
  }
};


const multipleUpload = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded"
      });
    }

    const fileData = req.files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path
    }));

    res.status(200).json({
      success: true,
      message: `${req.files.length} files uploaded successfully`,
      data: fileData
    });

  } catch (error) {
    handleError(error, res);
  }
};

// Mixed upload (files + form data)
const mixedUpload = async (req, res) => {
  try {
    const { name, bio } = req.body; 
    const avatar = req.files['avatar'] ? req.files['avatar'][0] : null;
    const gallery = req.files['gallery'] || [];
    const resume = req.files['resume'] ? req.files['resume'][0] : null;

    // Update user profile
    const userId = req.user.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        bio,
        ...(avatar && { avatar: avatar.filename }),
        ...(resume && { resume: resume.filename }),
        gallery: gallery.map(file => file.filename)
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });

  } catch (error) {
    handleError(error, res);
  }
};

export const FILE_UPLOAD = {
  singleUpload,
  multipleUpload,
  mixedUpload
};