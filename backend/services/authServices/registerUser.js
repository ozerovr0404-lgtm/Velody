import bcrypt from 'bcrypt';
import { User } from '../../models/User.js';

export const registerUser = async ({ email, password, stage_name, phone }) => {
  const ENG_SYMBOL = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_@.';

  if (!email || !password || !stage_name || !phone) {
    throw new Error("Все поля обязательны!");
  }

  if (!email.split("").every(char => ENG_SYMBOL.includes(char))) {
    throw new Error("Неверный формат email!");
  }

  const existingUser = await User.getByEmail(email);

  if (existingUser) {
    throw new Error("Такой аккаунт уже существует!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.createWithHashedPassword({
    email,
    password: hashedPassword,
    stage_name,
    phone
  });

  return user;
}