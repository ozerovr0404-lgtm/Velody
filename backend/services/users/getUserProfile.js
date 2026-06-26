import { ArtistProfile } from "../../models/ArtistProfile.js";

export const getUserProfile = async (id) => {
  const user = await ArtistProfile.getProfileWithSubInfo(id);

  if (!user) {
    throw new Error("Пользователь не найден!");
  }

  return user;
};