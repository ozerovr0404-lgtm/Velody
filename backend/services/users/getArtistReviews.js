import { ArtistProfile } from "../../models/ArtistProfile.js";

export const getReviewsByArtistProfileId = async (id) => {
  const reviews = await ArtistProfile.getReviewsById(id);

  if (!reviews || reviews.length === 0) {
    throw new Error('Комментарии не найдены!');
  }

  return reviews;
}