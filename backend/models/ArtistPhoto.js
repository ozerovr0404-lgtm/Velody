import pool from "../bd.js";

export class ArtistPhoto {

    static async create({
        artist_profile_id,
        url,
        order_index = 0
    }) {

        const result = await pool.query(
            `
            INSERT INTO artist_photo
            (
                artist_profile_id,
                url,
                order_index
            )
            VALUES
            ($1,$2,$3)
            RETURNING *
            `,
            [
                artist_profile_id,
                url,
                order_index
            ]
        );

        return result.rows[0];
    }

}