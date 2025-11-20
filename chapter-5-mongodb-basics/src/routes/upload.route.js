// routes/uploadRoutes.js
import express from 'express';
import upload from '../utils/multerConfig.js';
import { FILE_UPLOAD } from '../controllers/upload.controller.js';

const router = express.Router();


router.post('/single', upload.single('avatar'), FILE_UPLOAD.singleUpload);

router.post('/multiple', upload.array('documents', 5), FILE_UPLOAD.multipleUpload);

router.post('/profile', upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 3 },
  { name: 'resume', maxCount: 1 }
]), FILE_UPLOAD.mixedUpload);

export default router;