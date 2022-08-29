import express from 'express';
import UserDetails from '../models/userSchema.js';
import mongoose from 'mongoose';
import fs from 'fs';
import jwt from 'jsonwebtoken';
const router = express.Router();
import bcrypt from 'bcryptjs';
const register = async (req, res) => {
  const {
    name,
    address,
    email,
    username,
    accountnumber,
    password,
    confirmPassword,
  } = req.body;
  // console.log(req.body);
  if (
    !name ||
    !username ||
    !address ||
    !email ||
    !accountnumber ||
    !password ||
    !confirmPassword
  ) {
    res.status(200).json({ message: 'All field of data must be required' });
    return;
  }

  try {
    const existingUser = await UserDetails.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserDetails.create({
      name,
      accountnumber,
      email,
      password: hashedPassword,
      username,
      address,
    });
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default register;
