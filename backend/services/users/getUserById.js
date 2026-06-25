import { User } from "../../models/User.js";

export const getUserById = async (id) => {
  const user = await User.getById(id);

  if (!user) {
    throw new Error("Пользователь не найден!");
  }

  return user;
};