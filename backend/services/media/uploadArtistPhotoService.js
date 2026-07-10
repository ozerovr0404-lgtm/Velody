import { ArtistPhoto } from "../../models/ArtistPhoto.js";
import { uploadPhotoToS3 } from "../storage/uploadPhotoToS3.js";

export const uploadArtistPhotoService = async ({
    file,
    artistProfileId
}) => {

    const buffer = await file.toBuffer();

    const s3Result = await uploadPhotoToS3({
        buffer,
        mimeType: file.mimetype,
        originalName: file.filename
    });

    const photo = await ArtistPhoto.create({

        artist_profile_id: artistProfileId,

        url: s3Result.url,

        order_index: 0

    });


    return photo;

};