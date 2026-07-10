import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client.js";
import crypto from "crypto";


export const uploadPhotoToS3 = async ({
    buffer,
    mimeType,
    originalName
}) => {

    const extension = originalName.split(".").pop();

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const key = `artist-photo/${fileName}`;


    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.S3_BUCKET,

            Key: key,

            Body: buffer,

            ContentType: mimeType,

            ACL: "public-read"
        })
    );


    const url = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${key}`;


    return {
        key,
        url
    };
};