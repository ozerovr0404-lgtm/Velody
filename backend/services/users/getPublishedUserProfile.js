import { ArtistProfile } from "../../models/ArtistProfile.js";

export const getCatalogProfiles = async (is_published, page, limit) => {

  const totalItems = await ArtistProfile.countPublishedProfile(is_published);

  const profile = await ArtistProfile.getByPublishedIsTrue(is_published, page, limit);

  if (!profile.length) {
    throw new Error('Публикация не найдена!');
  }

  return {profile, totalItems};
}