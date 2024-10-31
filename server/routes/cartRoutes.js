import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../controllers/cartController.js';

const router = express.Router();

// All cart routes are protected
router.use(protect);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', removeFromCart);

export default router;