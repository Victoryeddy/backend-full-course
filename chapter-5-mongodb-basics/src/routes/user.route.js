import {Router} from 'express';
import { AUTH } from '../controllers/auth.controller.js';

const {handleRegister, handleLogin} = AUTH
const router = Router();

router.post('/register', handleRegister)
router.post('/login', handleLogin)

export default router;