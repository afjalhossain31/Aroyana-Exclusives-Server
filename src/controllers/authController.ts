import { Request, Response } from 'express';
import { getDB } from '../config/db';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const db = getDB();

    // ১. চেক করা হচ্ছে এই ইমেইল দিয়ে আগে কেউ অ্যাকাউন্ট খুলেছে কি না
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists with this email!' });
      return;
    }

    // ২. পাসওয়ার্ড এনক্রিপ্ট (Hash) করা হচ্ছে
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ৩. নতুন ইউজারকে ডেটাবেসে সেভ করা হচ্ছে
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