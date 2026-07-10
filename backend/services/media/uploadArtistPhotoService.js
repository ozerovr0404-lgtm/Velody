import { ArtistPhoto } from "../../models/ArtistPhoto.js";
import { uploadPhotoToS3 } from "../storage/uploadPhotoToS3.js";

export const uploadArtistPhotoService = async ({
    file,
    artistProfileId
}) => {
    console.log("SERVICE PROFILE ID:", artistProfileId);

    const buffer = await file.toBuffer();

    const s3Result = await uploadPhotoToS3({
        buffer,
        mimeType: file.mimetype,
        originalName: file.filename
    });
        console.log("S3 RESULT:", s3Result);

    

    const photo = await ArtistPhoto.create({

        artist_profile_id: artistProfileId,

        url: s3Result.url,

        order_index: 0

    });
    console.log("DB PHOTO:", photo);


    return photo;

};