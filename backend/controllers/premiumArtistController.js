import { ArtistProfile } from "../models/ArtistProfile.js"


export const getPremiumArtistController = async (request, reply) => {
  try {
    const artists = await ArtistProfile.getPremiumArtists();

    return reply.code(200).send({
      success: true,
      artists
    });

  } catch (err) {
    console.error(err);
    return reply.code(500).send({
      message: err.message
    });
  }
}