import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Bank from '../models/bankinfoModel.js';
import { isAuth, isAdmin } from '../utils.js';

bankRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newBankinfo = new Bank({
      accountname: req.body.accountname,
      email: req.body.email,
      accountnumber: req.body.accountnumber,
    });
    const bank = await newBankinfo.save();
    res.status(201).send({ message: 'New Bank info Added', bank });
  })
);
