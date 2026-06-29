import { getUser, getProfile, getArtistPositions } from "../controllers/userControllers.js";

export default async function usersRoutes(fastify, options) {
  fastify.get('/:id', getUser);
  fastify.get('/profile/:id', getProfile);
  fastify.get('/artist-positions', getArtistPositions);
}