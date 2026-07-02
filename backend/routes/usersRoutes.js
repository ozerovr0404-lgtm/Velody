import { getUser, getProfile, getArtistPositions, updateProfile, getGenresForProfile } from "../controllers/userControllers.js";
import { validate } from "../middlewares/validate.js";
import { updateProfileSchema } from "../schemas/profile.schemas.js";
import { idParamsSchema } from "../schemas/idParams.schema.js";

export default async function usersRoutes(fastify, options) {
  fastify.get(
    '/:id', 
    {  preHandler: validate(idParamsSchema, "params") },
    getUser
  );

  fastify.get(
    'profile/:id',
    {  preHandler: validate(idParamsSchema, "params") },
    getProfile
  );

  fastify.get('/artist-positions', getArtistPositions);
  fastify.get('/genres', getGenresForProfile);

  fastify.patch(
    'profile/:id',
    {
      preHandler: [
        validate(idParamsSchema, "params"),
        validate(updateProfileSchema, "body")
      ]
    },
    updateProfile
  );
}