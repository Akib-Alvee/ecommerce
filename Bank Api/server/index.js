import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import registerRoutes from './routes/register.js';
import transactionRoutes from './routes/transaction.js';
import UserDetails from './models/userSchema.js';

const dotenv1 = dotenv.config();

const app = express();

const corsOptions = {
  credentials: true,
  optionSuccessStatus: 200,
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/transaction', transactionRoutes);
app.use('/auth', authRoutes);
app.use('/register', registerRoutes);

app.use('/', async (req, res) => {
  let temp = await UserDetails.find({ username: 'fahim khan' });

  res.status(200).send('Get Successfully');
});
app.post('/postuser', async (req, re) => {
  const { email, password, username, address } = req.body;
  const result = await UserDetails.create({
    email,
    password,
    username,
    address,
  });
  re.status(200).send('Get Successfully');
});

const MONGODB_URI =
  'mongodb://fahim01:1127732@cluster0-shard-00-00.gjszz.mongodb.net:27017,cluster0-shard-00-01.gjszz.mongodb.net:27017,cluster0-shard-00-02.gjszz.mongodb.net:27017/bank?ssl=true&replicaSet=atlas-115szr-shard-0&authSource=admin&retryWrites=true&w=majority';

const PORT = 3301;

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
