import { getUser, getProfile, getArtistPositions, updateProfile } from "../controllers/userControllers.js";

export default async function usersRoutes(fastify, options) {
  fastify.get('/:id', getUser);
  fastify.get('/profile/:id', getProfile);
  fastify.get('/artist-positions', getArtistPositions);
  fastify.patch('/profile/:id', updateProfile);
}