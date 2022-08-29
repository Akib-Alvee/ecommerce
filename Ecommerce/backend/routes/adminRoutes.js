import express from 'express';
import Product from '../models/productModals.js';
import expressAsyncHandler from 'express-async-handler';

const adminRouter = express.Router();

adminRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      const resProduct = await newProduct.save();
      res.send(resProduct);
    } catch (error) {
      console.log(error);
    }
  })
);

export default adminRouter;
