import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product');
    
    if (!cart) {
      return res.status(200).json({
        status: 'success',
        data: {
          items: []
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        items: cart.items
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Validate product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    if (product.stockAvailability < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Not enough stock available'
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    // Check if product already in cart
    const cartItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update quantity if product exists
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      // Add new item if product doesn't exist in cart
      cart.items.push({
        product: productId,
        quantity
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const itemId = req.params.id;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found'
      });
    }

    const cartItem = cart.items.id(itemId);
    if (!cartItem) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart item not found'
      });
    }

    // Validate stock availability
    const product = await Product.findById(cartItem.product);
    if (product.stockAvailability < quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Not enough stock available'
      });
    }

    cartItem.quantity = quantity;
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const itemId = req.params.id;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        status: 'fail',
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    await cart.populate('items.product');

    res.status(200).json({
      status: 'success',
      data: {
        cart
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};