import express from 'express';
import { makePayment } from '../controllers/transaction.js';
import authMiddle from '../middleware/auth.js';

const router = express.Router();

router.post('/payment', makePayment);

export default router;
