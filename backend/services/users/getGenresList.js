import { ArtistGenres } from "../../models/ArtistGenres.js";

export const getGenresList = async () => {
  const genres = await ArtistGenres.getAll();

  if (!genres || genres.length === 0) {
    throw new Error('Список жанров пуст!');
  }

  return genres;
}