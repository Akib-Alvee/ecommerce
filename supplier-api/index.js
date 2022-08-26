import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './src/routes/orderRoutes.js';
import productRouter from './src/routes/productRoutes.js';
import seedRouter from './src/routes/seedRoutes.js';
import uploadRouter from './src/routes/uploadRoutes.js';
import userRouter from './src/routes/userRoutes.js';

// const cors = reqrsuire('cors')
dotenv.config()
// const mongoose = require('mongoose')
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });


const app= express(); 
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);
const port = process.env.PORT || 5001;

app.use(express.json()); 



app.listen(port,()=>{
    console.log(`supplier-api server started on port ${port}`);
})
