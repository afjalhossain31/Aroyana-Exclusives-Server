import { Router } from 'express';
// এখানে getItemById যুক্ত করা হয়েছে
import { addItem, getItems, getItemById } from '../controllers/itemController'; 

const router = Router();

// POST রিকোয়েস্টের মাধ্যমে ডাটা সেভ করার রাউট
router.post('/add', addItem);

// GET রিকোয়েস্টের মাধ্যমে ডাটা রিড করার রাউট
router.get('/', getItems);

// নির্দিষ্ট আইডি দিয়ে একটি প্রোডাক্ট গেট করার রাউট
router.get('/:id', getItemById);

export default router;