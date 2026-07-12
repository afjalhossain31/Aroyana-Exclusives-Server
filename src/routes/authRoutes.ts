import { Router } from 'express';
import { registerUser } from '../controllers/authController';

const router = Router();

// রেজিস্ট্রেশনের জন্য POST রাউট
router.post('/register', registerUser);

export default router;