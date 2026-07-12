import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController'; // loginUser ইম্পোর্ট করা হলো

const router = Router();

// রেজিস্ট্রেশনের জন্য রাউট
router.post('/register', registerUser);

// লগইনের জন্য নতুন রাউট
router.post('/login', loginUser);

export default router;