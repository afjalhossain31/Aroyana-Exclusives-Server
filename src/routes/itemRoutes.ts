import { Router } from 'express';
import { addItem, getItems, getItemById } from '../controllers/itemController'; 

const router = Router();

router.post('/add', addItem);
router.get('/', getItems);
router.get('/:id', getItemById);

export default router;