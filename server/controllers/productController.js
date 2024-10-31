import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let query = {};

    // Apply filters if they exist
    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        status: 'fail',
        message: 'No product found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        product
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
