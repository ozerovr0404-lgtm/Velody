import { ArtistProfile } from "../../models/ArtistProfile.js";

export const createReview = async ({
  rating,
  comment,
  artist_profile_id,
  author_profile_id
}) => {
  const result = await ArtistProfile.createReviewByProfileId(
    rating,
    comment,
    artist_profile_id,
    author_profile_id
  );

  if (!result) {
    throw new Error('Не удалось добавить комментарий!');
  }

  return result;
}