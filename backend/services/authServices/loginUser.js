import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../../models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Логин или пароль обязательны!");
  }

  const user = await User.getByEmail(email);

  if (!user) {
    throw new Error("Неверный логин или пароль!")
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Неверный логин или пароль!");
  }

  const token = jwt.sign(
    {id: user.id, email: user.email},
    JWT_SECRET,
    {expiresIn: '1h'}
  );

  return {user, token};
}