import express from 'express';
import Product from './../models/productModals.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  console.log(createdProducts);
  res.send({ createdProducts });
});
export default seedRouter;
