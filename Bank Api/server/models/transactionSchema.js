import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  sender: { type: mongoose.Types.ObjectId, ref: 'User' },
  reciever: { type: mongoose.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
});

const TransactionsDetails = mongoose.model(
  'TransactionsDetails',
  transactionSchema
);
export default TransactionsDetails;
