import { getPublishedProfile } from "../controllers/catalogController.js";
import { addToLikeCard } from "../controllers/catalogController.js";
import { getPremiumArtistController } from "../controllers/premiumArtistController.js";

export default async function catalogRoutes (fastify, options) {
  fastify.get('/', getPublishedProfile);
  fastify.post('/:artistId/favorite', addToLikeCard);
  fastify.get('/premium', getPremiumArtistController);
};