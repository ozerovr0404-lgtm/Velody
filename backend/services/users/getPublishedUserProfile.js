import { ArtistProfile } from "../../models/ArtistProfile.js";

export const getCatalogProfiles = async (is_published) => {
  const profile = await ArtistProfile.getByPublishedIsTrue(is_published);

  if (!profile.length) {
    throw new Error('Публикация не найдена!');
  }

  return profile;
}