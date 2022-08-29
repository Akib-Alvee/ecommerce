import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  address: String,
  email: String,
  accountnumber: Number,
  password: String,
  balance: { type: Number, default: 1000000 },
});

const UserDetails = mongoose.model('UserDetails', userSchema);
export default UserDetails;
