import { getPublishedProfile } from "../controllers/catalogController.js";

export default async function catalogRoutes (fastify, options) {
  fastify.get('/', getPublishedProfile);
};