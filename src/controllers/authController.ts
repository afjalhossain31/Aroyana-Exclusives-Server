import { Request, Response } from 'express';
import { getDB } from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

// user registration function
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const db = getDB();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email!' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    await db.collection('users').insertOne(newUser);
    res.status(201).json({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error });
  }
};

// user login function
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const db = getDB();

    // user key email diye khuje ber kora
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password!' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password!' });
      return;
    }

    // Password Match Justified, Now Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' } 
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error });
  }
};