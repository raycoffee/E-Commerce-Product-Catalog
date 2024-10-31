import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getAllProducts, 
  getProduct, 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);

export default router;