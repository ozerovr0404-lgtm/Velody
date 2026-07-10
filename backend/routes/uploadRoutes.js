import { uploadArtistPhotoController } from "../controllers/uploadController.js";

export default async function uploadRoutes(fastify) {
    fastify.post("/photo", uploadArtistPhotoController);
}