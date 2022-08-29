import express from 'express';
import authMiddle from '../middleware/auth.js';
import { makePayment } from '../controllers/transaction.js';

const router = express.Router();

router.post('/payment', makePayment);

export default router;
