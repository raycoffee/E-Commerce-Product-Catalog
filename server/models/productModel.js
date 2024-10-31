// models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'A product must have a description']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['electronics', 'fashion', 'books', 'home', 'beauty']
  },
  imageUrl: {
    type: String,
    required: [true, 'A product must have an image']
  },
  stockAvailability: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;