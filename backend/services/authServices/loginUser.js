import { User } from '../../models/User.js';
import bcrypt from 'bcrypt';


export const loginUser = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Логин или пароль обязательны!");
  }  // перенести на фронт проверку

  const user = await User.getByEmail(email);

  if (!user) {
    throw new Error("Неверный логин или пароль!")
  }

  const profile = await User.getProfileByUserId(user.id);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Неверный логин или пароль!");
  }

  return {
    user, 
    profile
  };
};