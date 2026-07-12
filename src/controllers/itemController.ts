import { Request, Response } from 'express';
import { getDB } from '../config/db';
import { ObjectId } from 'mongodb';

// ১. আইটেম অ্যাড করার ফাংশন
export const addItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, shortDescription, fullDescription, price, imageUrl, category } = req.body;

    const newItem = {
      title,
      shortDescription,
      fullDescription,
      price: Number(price),
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600',
      category: category || 'Uncategorized',
      createdAt: new Date()
    };

    const db = getDB();
    const result = await db.collection('items').insertOne(newItem);

    res.status(201).json({ message: 'Item added successfully', itemId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding item', error });
  }
};

// ২. সব আইটেম ডেটাবেস থেকে নিয়ে আসার ফাংশন
export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const items = await db.collection('items').find({}).sort({ createdAt: -1 }).toArray();
    
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching items', error });
  }
};

// ৩. নির্দিষ্ট আইডি দিয়ে একটি প্রোডাক্ট খোঁজার ফাংশন
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const { id } = req.params;

    // আইডিটি MongoDB-এর আসল আইডি কি না, তা চেক করা হচ্ছে (যাতে সার্ভার ক্র্যাশ না করে)
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid Item ID format' });
      return;
    }

    const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
    
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching item details', error });
  }
};