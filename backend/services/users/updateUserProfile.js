import { ArtistProfile } from "../../models/ArtistProfile.js"

export const updateUserProfile = async (
  id,
  payload
) => {
  const result = await ArtistProfile.updateUserProfileFromId(
    id,
    payload
  );

  if (!result.rows.length) {
    throw new Error("Не удалось обновить профиль пользователя!");
  }

  return result;
}