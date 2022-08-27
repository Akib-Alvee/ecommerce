import express from 'express';
import data from '../../sellerdata.js';
import User from '../model/selleruserModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  // await Product.remove({});
  // const createdProducts = await Product.insertMany(data.products);
  // console.log(createdProducts);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);

  // res.send({ createdProducts, createdUsers });
  res.send({  createdUsers });
});
export default seedRouter;
