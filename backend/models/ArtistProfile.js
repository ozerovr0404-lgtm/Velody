import pool from "../bd.js";

export class ArtistProfile {
  static async getByPublishedIsTrue(is_published, page, limit) {

    if (typeof is_published !== "boolean") {
      throw new Error('is_published must be boolean');
    }

    const offset = (page - 1) * limit;
    
    const result = await pool.query(
      `SELECT *
      FROM (
        SELECT 
          p.id,
          p.stage_name,
          p.description,
          p.city,
          p.price_from,
          p.rating,
          p.reviews_count,
          p.is_published,

          ph.url AS avatar_url,

          COALESCE(
            json_agg(DISTINCT g.name) 
            FILTER (WHERE g.name IS NOT NULL),
            '[]'
          ) AS genres,

          COALESCE(
            json_agg(DISTINCT pos.position_name)
            FILTER (WHERE pos.position_name IS NOT NULL),
            '[]'
          ) AS positions

        FROM artist_profile p

        LEFT JOIN LATERAL (
          SELECT url
          FROM artist_photo ph
          WHERE ph.artist_profile_id = p.id
          ORDER BY ph.order_index ASC
          LIMIT 1
        ) ph ON true

        LEFT JOIN artist_genre ag 
          ON ag.artist_profile_id = p.id
        LEFT JOIN genre g 
          ON g.id = ag.genre_id

        LEFT JOIN artist_profile_position app 
          ON app.artist_profile_id = p.id
        LEFT JOIN artist_position pos 
          ON pos.id = app.artist_position_id

        WHERE p.is_published = $1

        GROUP BY p.id, ph.url
      ) sub
      ORDER BY sub.id DESC
      LIMIT $2
      OFFSET $3
    `,
    [is_published, limit, offset]
  );
    if (!result.rows.length) return null;
    return result.rows;
  };

  
  static async countPublishedProfile(is_published) {
    const result = await pool.query(
      `
        SELECT COUNT(*) AS total
        FROM artist_profile
        WHERE is_published = $1
      `,
      [is_published]
    );

    return Number(result.rows[0].total);
  }


  static async getProfileWithSubInfo(id) {
    const result = await pool.query(
      `
      SELECT
        p.id,
        p.stage_name,
        p.description,
        p.city,
        p.price_from,
        p.rating,
        p.reviews_count,
        p.is_published,
        p.experience_years,
        p.is_published,

        (
          SELECT ph.url
          FROM artist_photo ph
          WHERE ph.artist_profile_id = p.id
          ORDER BY ph.order_index ASC
          LIMIT 1
        ) AS avatar_url,

        COALESCE((
          SELECT json_agg(
            jsonb_build_object(
              'id', g.id,
              'name', g.name
            )
          )
          FROM artist_genre ag
          JOIN genre g ON g.id = ag.genre_id
          WHERE ag.artist_profile_id = p.id
        ), '[]') AS genres,

        COALESCE((
          SELECT json_agg(
            jsonb_build_object(
              'id', pos.id,
              'name', pos.position_name
            )
          )
          FROM artist_profile_position app
          JOIN artist_position pos ON pos.id = app.artist_position_id
          WHERE app.artist_profile_id = p.id
        ), '[]') AS artist_position

      FROM artist_profile p
      WHERE p.id = $1
      `,
      [id]
    );

    if (!result.rows.length) return null;

    return result.rows[0];
  }


    static async updateUserProfileFromId(
      id,
      payload
    ) {

      const {
        stage_name,
        experience_years,
        city,
        price_from,
        description,
        artist_position,
        genres,
        is_published
      } = payload;

      const client = await pool.connect();

      try {
        await client.query('BEGIN');

        const result = await client.query(
          `
          UPDATE artist_profile
          SET
            stage_name = $1,
            experience_years = $2,
            city = $3,
            price_from = $4,
            description = $5,
            is_published = $6
          WHERE id = $7
          RETURNING *
          `,
          [
            stage_name,
            experience_years,
            city,
            price_from,
            description,
            is_published,
            id
          ]
        );

        if (!result.rows.length) {
          throw new Error("Profile not found or not updated");
        }

        await client.query(
          `DELETE FROM artist_genre WHERE artist_profile_id = $1`,
          [id]
        );

        for (const genre of genres ?? []) {
          await client.query(
            `INSERT INTO artist_genre (artist_profile_id, genre_id)
            VALUES ($1, $2)`,
            [id, genre]
          );
        }

        await client.query(
          `DELETE FROM artist_profile_position WHERE artist_profile_id = $1`,
          [id]
        );

        for (const pos of artist_position ?? []) {
          await client.query(
            `INSERT INTO artist_profile_position (artist_profile_id, artist_position_id)
            VALUES ($1, $2)`,
            [id, pos]
          );
        }

        await client.query('COMMIT');

        const fullProfileResult = await client.query(
          `
          SELECT 
            ap.*,

            COALESCE(
              (
                SELECT apf.url
                FROM artist_photo apf
                WHERE apf.artist_profile_id = ap.id
                ORDER BY apf.order_index ASC
                LIMIT 1
              ),
              NULL
            ) AS avatar_url,

            COALESCE(
              json_agg(DISTINCT g)
              FILTER (WHERE g.id IS NOT NULL),
              '[]'
            ) AS genres,

            COALESCE(
              json_agg(
                DISTINCT jsonb_build_object(
                  'id', p.id,
                  'name', p.position_name
                )
              )
              FILTER (WHERE p.id IS NOT NULL),
              '[]'
            ) AS artist_position

          FROM artist_profile ap

          LEFT JOIN artist_genre ag 
            ON ag.artist_profile_id = ap.id

          LEFT JOIN genre g 
            ON g.id = ag.genre_id

          LEFT JOIN artist_profile_position app 
            ON app.artist_profile_id = ap.id

          LEFT JOIN artist_position p 
            ON p.id = app.artist_position_id

          WHERE ap.id = $1

          GROUP BY ap.id
          `,
          [id]
        );

        return fullProfileResult.rows[0];

      } catch (err) {

        await client.query('ROLLBACK');
        throw err;

      } finally {
        client.release();
      }
    }


    static async getReviewsById(artistProfileId) {
      const result = await pool.query(
        `
          SELECT
          r.id,
          r.rating,
          r.comment,
          r.created_at,
          r.artist_profile_id,
          r.author_profile_id,

          u.stage_name AS author_name

          FROM review r
          JOIN artist_profile u ON u.id = r.author_profile_id

          WHERE r.artist_profile_id = $1
          ORDER BY r.created_at DESC
        `, [artistProfileId]
      )

      return result.rows;
    }
}