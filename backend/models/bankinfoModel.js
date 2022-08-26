import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema(
  {
    bankInfo: {
      accountname: { type: String, required: true },
      accountnumber: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Bank = mongoose.model('bank', bankSchema);
export default Bank;
