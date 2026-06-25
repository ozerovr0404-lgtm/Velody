import { User } from "../../models/User.js";

export const getUserProfile = async (id) => {
  const user = await User.getProfileById(id);

  if (!user) {
    throw new Error("Пользователь не найден!");
  }

  return user;
};