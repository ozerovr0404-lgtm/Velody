import { getCatalogProfiles } from "../services/users/getPublishedUserProfile.js";
import { addToLikeById } from "../services/users/addToLikeById.js";

export const getPublishedProfile = async (request, reply) => {
  try {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 6;

    const userId = request.session?.user?.profileId || null;

    const filters = {
      is_published: true,
      tab: request.query.tab,
      ratingFrom: request.query.ratingFrom,
      ratingTo: request.query.ratingTo,
      experienceFrom: request.query.experienceFrom,
      experienceTo: request.query.experienceTo,
      priceFrom: request.query.priceFrom,
      priceTo: request.query.priceTo,
      genres: request.query.genres,
      likeOnly: request.query.likeOnly == "true"
    };

    const profile = await getCatalogProfiles(filters, page, limit, userId);

    return reply.code(200).send({
      message: 'Публикации получены!',
      data: profile
    });

  } catch (err) {
        console.error(err);
    return reply.code(500).send({
      error: err.message,
    });
  }
};


export const addToLikeCard = async (request, reply) => {
  try {
    const userId = request.session?.user?.profileId;

    if (!userId) {
      return reply.code(401).send({
        error: 'Unauthorized'
      });
    }

    const artistId = Number(request.params.artistId);

    const result = await addToLikeById(userId, artistId);

    return reply.code(201).send({
      message: 'OK',
      data: result
    });

  } catch (err) {
    return reply.code(500).send({
      error: err.message
    });
  }
};
