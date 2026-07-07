import { ArtistProfile } from "../../models/ArtistProfile.js";

export const addToLikeById = async (userId, artistId) => {

  if (!userId || !artistId) {
    throw new Error("Invalid params");
  }

  const result = await ArtistProfile.addToLikeById(userId, artistId);

  return result;
};