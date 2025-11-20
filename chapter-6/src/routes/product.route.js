import express from 'express';
import { getProductStats } from '../controllers/product.controller.js';


const router = express.Router();

router.get('/', getProductStats)

export default router;