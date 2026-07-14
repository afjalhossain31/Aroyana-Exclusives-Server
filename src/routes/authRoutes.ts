import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController'; 

const router = Router();

// registration route
router.post('/register', registerUser);
// login route
router.post('/login', loginUser);

export default router;