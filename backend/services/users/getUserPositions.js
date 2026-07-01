import { ArtistPosition } from "../../models/ArtistPosition.js"

export const getArtPositions = async () => {
  const positions = await ArtistPosition.getAll();

  if (!positions || positions.length === 0) {
    throw new Error('Список специализаций пуст!');
  }

  return positions;
};