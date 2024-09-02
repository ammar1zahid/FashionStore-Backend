import express from 'express';
import authRoutes from './controllers/auth/auth.routes';
import userRoutes from './controllers/user/user.routes';
import productRoutes from './controllers/products/product.routes';
import cartRoutes from './controllers/cart/cart.routes'; 
import orderRoutes from './controllers/order/order.routes'; 
import wishlistRouter from './controllers/wishlist/wishlist.routes'; 
import addressRouter from './controllers/address/address.routes'; 
import stripeRouter from './controllers/stripe/stripe.routes'; 
import ratingRouter from "./controllers/rating/rating.routes"

const Routers = express.Router();

// Routes to auth
Routers.use('/auth', authRoutes);

// Routes to  user
Routers.use('/users', userRoutes);

// Routes to  products
Routers.use('/products', productRoutes);

// Routes to  cart
Routers.use('/carts', cartRoutes);

// Routes to  order
Routers.use('/orders', orderRoutes);

// Routes to  wishlist
Routers.use('/wishlist', wishlistRouter);

// Routes to  address
Routers.use('/address', addressRouter);

// Routes to  checkout
Routers.use('/checkout', stripeRouter);

// Routes to  rating
Routers.use('/rating', ratingRouter);

export default Routers;
