import { getUser, getProfile } from "../controllers/userControllers.js";

export default async function usersRoutes(fastify, options) {
  fastify.get('/:id', getUser);
  fastify.get('/profile/:id', getProfile);
}