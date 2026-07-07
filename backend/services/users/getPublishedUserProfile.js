import { ArtistProfile } from "../../models/ArtistProfile.js";

export const getCatalogProfiles = async (filters, page, limit, userId) => {

  const result = await ArtistProfile.getByPublishedIsTrue(filters, page, limit, userId);

  return {
    profile: result.profile,
    totalItems: result.totalItems
  };
}