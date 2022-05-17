import express from 'express';
import Product from './../models/productModals.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  console.log('Ïn the products route');
  const products = await Product.find();
  // console.log(products);
  res.send(products);
});

productRouter.get('/slug/:slug', async (req, res) => {
  console.log(req.params.slug);
  // const product = await Product.findOne((x) => x.slug === req.params.slug);
  const product = await Product.findOne({ slug: req.params.slug });
  console.log(product);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
