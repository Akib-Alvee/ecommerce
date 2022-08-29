import express from 'express';
import register from '../controllers/register.js';

const router = express.Router();

router.post('/', register);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'this is the register hit poiht' });
});

export default router;
