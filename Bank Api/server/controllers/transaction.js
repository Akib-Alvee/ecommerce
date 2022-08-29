import express from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import TransactionsDetails from '../models/transactionSchema.js';
import UserDetails from '../models/userSchema.js';

const router = express.Router();

///DATABASEE
let USERS = [];

fs.readFile('./../server/database/user.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  USERS = JSON.parse(data);
  // console.log(data);
});

///DATABASE

export const deposit = async (req, res) => {
  console.log(req.body);
  const amount = parseInt(req.body.amount);
  const username = req.body.username;
  // const accountnumber = req.body.accountnumber;
  if (!amount) {
    res.status(400).json({ message: 'Amount not to be nulled' });
  }
  // res.status(200).json({ message: 'Success' });
  USERS.map((user) => {
    if (user.username == username) {
      user.balance += amount;

      fs.writeFile(
        './../server/database/user.json',
        JSON.stringify(USERS),
        (err) => {
          if (err) {
            res.send('Amount not deposited');
          } else {
            res.status(200).send('Amount successfully deposited');
          }
        }
      );
    }
  });
};

export const withdraw = async (req, res) => {
  // console.log(req.body);
  const amount = parseInt(req.body.amount);
  const username = req.body.username;
  if (!amount) {
    res.status(400).json({ message: 'Amount not to be nulled' });
  }
  // res.status(200).json({ message: 'Success' });
  USERS.map((user) => {
    if (user.username == username) {
      if (amount > user.balance) {
        return res.send('Not enough balance in the account');
      }
      user.balance -= amount;

      fs.writeFile(
        './../server/database/user.json',
        JSON.stringify(USERS),
        (err) => {
          if (err) {
            res.send('Amount not withdrawn');
          } else {
            res.status(200).send('Amount successfully withdrawn');
          }
        }
      );
    }
  });
};

export const makePayment = async (req, res) => {
  console.log(req.body);
  const amount = parseInt(req.body.amount);
  // console.log("Amm", { amount });
  const { sender, reciever } = req.body;

  try {
    if (!sender || !reciever || !req.body.password) {
      res.send({ message: 'All field of data must be required' });
    }

    if (!amount) {
      res.send({ message: 'Amount not to be nulled' });
    }

    let temp = await UserDetails.find({ username: sender });
    // console.log({ temp });
    const senderExist = temp[0];

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      senderExist.password
    );
    if (!isPasswordCorrect) {
      return res.send({ message: 'Incorrect password' });
    } else if (!senderExist) {
      return res.send({
        message: 'No account with the sender account number.',
      });
    } else if (senderExist.balance < amount) {
      return res.send({ message: 'Not a valid amount !' });
    }

    temp = await UserDetails.find({ username: reciever });
    const recieverExist = temp[0];

    if (!recieverExist) {
      return res.send({
        message: 'No account with the reciever account number.',
      });
    }

    let senderTemp = getData(senderExist);
    let recieverTemp = getData(recieverExist);

    senderTemp.balance = senderTemp.balance - amount;
    recieverTemp.balance = recieverTemp.balance - amount;

    const senderUpdated = { ...senderTemp };
    const recieverUpdated = { ...recieverTemp };

    await UserDetails.findByIdAndUpdate(
      senderExist._doc._id.toString(),
      senderUpdated,
      { new: true }
    );
    await UserDetails.findByIdAndUpdate(
      recieverExist._doc._id.toString(),
      recieverUpdated,
      { new: true }
    );

    const data = {
      sender: senderExist._doc._id,
      reciever: recieverExist._doc._id,
      amount,
    };

    const result = await TransactionsDetails.create(data);
    console.log(result);
    res.status(200).send({
      message: 'Transaction Successfully',
      Transaction_ID: result._doc._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

function getData(data) {
  let { accountnumber, username, password, address, email, balance } = data;
  let newData = { accountnumber, username, password, address, email, balance };
  return newData;
}
export default router;
