import { getUser, getProfile, getArtistPositions, updateProfile, getGenresForProfile } from "../controllers/userControllers.js";
import { validate } from "../middlewares/validate.js";
import { updateProfileSchema } from "../schemas/profile.schemas.js";
import { idParamsSchema } from "../schemas/idParams.schema.js";
import { checkProfileOwner } from "../middlewares/checkProfileOwner.js";
import { getReviewsByArtistProfile } from "../controllers/userControllers.js";

export default async function usersRoutes(fastify, options) {
  fastify.get(
    '/:id', 
    {  preHandler: validate(idParamsSchema, "params") },
    getUser
  );

  fastify.get(
    '/profile/:id',
    {  preHandler: validate(idParamsSchema, "params") },
    getProfile
  );

  fastify.get('/artist-positions', getArtistPositions);
  fastify.get('/genres', getGenresForProfile);

  fastify.get('/profile/:id/reviews', getReviewsByArtistProfile);

  fastify.patch(
    'profile/:id',
    {
      preHandler: [
        checkProfileOwner((request) => Number(request.params.id)),
        validate(idParamsSchema, "params"),
        validate(updateProfileSchema, "body")
      ]
    },
    updateProfile
  );
}