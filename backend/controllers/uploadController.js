import { uploadArtistPhotoService } from "../services/media/uploadArtistPhotoService.js";

export const uploadArtistPhotoController = async (request, reply) => {

    try {

        const file = await request.file();


        if (!file) {
            return reply.code(400).send({
                message: "Файл не найден"
            });
        }


        const artistProfileId = request.session.user.profileId;


        if (!artistProfileId) {
            return reply.code(401).send({
                message: "Пользователь не авторизован"
            });
        }


        const photo = await uploadArtistPhotoService({
            file,
            artistProfileId
        });


        return reply.code(201).send({
            success: true,
            photo
        });


    } catch(err) {

        console.error("UPLOAD CONTROLLER ERROR", err);

        return reply.code(500).send({
            message: err.message
        });

    }

};