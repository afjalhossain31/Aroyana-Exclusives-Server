import { Router } from 'express';
import { addItem, getItems, getItemById, deleteItem } from '../controllers/itemController'; 

const router = Router();

router.post('/add', addItem);
router.get('/', getItems);
router.get('/:id', getItemById);

router.delete('/delete/:id', deleteItem);

export default router;