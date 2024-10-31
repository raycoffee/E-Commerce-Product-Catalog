import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js'
import cookieParser from 'cookie-parser';


const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use(cookieParser());
// Routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/auth', authRoutes)

// Global error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  res.status(status).json({
    success: false,
    status,
    message,
  });
});

export default app;