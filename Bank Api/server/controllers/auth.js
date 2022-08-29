import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import UserDetails from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
const router = express.Router();

export const login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(200).json({ message: 'All field of data must be required' });
  }

  try {
    const existingUser = await UserDetails.findOne({ username });

    if (!existingUser)
      return res
        .status(404)
        .json({ message: 'Please log in with a registered account number.' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credintials.' });
    else return res.status(200).json({ message: 'Login Successful.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').send('Successfully logged out.');
};

export const userinfo = (req, res) => {
  UserDetails.map((user) => {
    if (user.username == req.params.username) {
      res.send(user);
    }
  });
};

export default router;
