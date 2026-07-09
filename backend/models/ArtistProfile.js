import pool from "../bd.js";

export class ArtistProfile {
  static async getByPublishedIsTrue(filters, page, limit, userId) {
    const offset = (page - 1) * limit;

    const where = [];
    const values = [];
    let i = 1;

    const userIdParam = userId ? Number(userId) : null;

    where.push(`p.is_published = $${i++}`);
    values.push(true);

    if (filters.ratingFrom !== undefined && filters.ratingTo !== undefined) {
      where.push(`p.rating BETWEEN $${i++} AND $${i++}`);
      values.push(Number(filters.ratingFrom), Number(filters.ratingTo));
    }


    if (filters.experienceFrom) {
      where.push(`p.experience_years >= $${i++}`);
      values.push(Number(filters.experienceFrom));
    }
    if (filters.experienceTo) {
      where.push(`p.experience_years <= $${i++}`);
      values.push(Number(filters.experienceTo));
    }


    if (filters.priceFrom) {
      where.push(`p.price_from >= $${i++}`);
      values.push(Number(filters.priceFrom));
    }
    if (filters.priceTo) {
      where.push(`p.price_from <= $${i++}`);
      values.push(Number(filters.priceTo));
    }

    if (filters.genres?.length) {
      where.push(`
        EXISTS (
          SELECT 1
          FROM artist_genre ag
          WHERE ag.artist_profile_id = p.id
          AND ag.genre_id = ANY($${i++})
        )
      `);

      const genres = await JSON.parse(filters.genres);
      values.push(genres.map(Number));
    }
    
    if (
      filters.tab !== "false" &&
      filters.tab !== null &&
      filters.tab !== undefined &&
      filters.tab !== ""
    ) {

      const TAB_MAP = {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6
      };

      const positionId = TAB_MAP[filters.tab];

      if (positionId) {
        where.push(`
          EXISTS (
            SELECT 1
            FROM artist_profile_position app
            WHERE app.artist_profile_id = p.id
            AND app.artist_position_id = $${i++}
          )
        `);
      }

      values.push(positionId);
    }

    if (filters.likeOnly && userIdParam) {
        where.push(`
            EXISTS (
              SELECT 1
              FROM user_favorites uf
              WHERE uf.user_id = $${i++}
                AND uf.artist_id = p.id
            )
          `);

          values.push(userIdParam);
      }

    const query = `
      SELECT *
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
          p.experience_years,

          ph.url AS avatar_url,

          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', g.id,
                'name', g.name
              )
            ) FILTER (WHERE g.id IS NOT NULL),
            '[]'
          ) AS genres,

          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', pos.id,
                'name', pos.position_name
              )
            ) FILTER (WHERE pos.id IS NOT NULL),
            '[]'
          ) AS positions,

          ${
            userIdParam
              ? `
                EXISTS (
                  SELECT 1
                  FROM user_favorites uf
                  WHERE uf.user_id = ${userIdParam}
                    AND uf.artist_id = p.id
                ) AS is_liked
              `
              : `false AS is_liked`
          }

        FROM artist_profile p

        LEFT JOIN LATERAL (
          SELECT url
          FROM artist_photo ph
          WHERE ph.artist_profile_id = p.id
          ORDER BY ph.order_index ASC
          LIMIT 1
        ) ph ON true

        LEFT JOIN artist_genre ag ON ag.artist_profile_id = p.id
        LEFT JOIN genre g ON g.id = ag.genre_id

        LEFT JOIN artist_profile_position app ON app.artist_profile_id = p.id
        LEFT JOIN artist_position pos ON pos.id = app.artist_position_id

        ${where.length ? `WHERE ${where.join(' AND ')}` : ''}

        GROUP BY p.id, ph.url
      ) sub
      ORDER BY sub.id DESC
      LIMIT $${i++}
      OFFSET $${i++}
    `;

    values.push(limit, offset);

    const result = await pool.query(query, values);

    const countQuery = `
      SELECT COUNT(*) FROM artist_profile p
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
    `;

    const countResult = await pool.query(countQuery, values.slice(0, -2));

    return {
      profile: result.rows,
      totalItems: Number(countResult.rows[0].count)
    };
  }


  static async addToLikeById(userId, artistId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const existing = await client.query(
        `
        SELECT 1 FROM user_favorites
        WHERE user_id = $1 AND artist_id = $2
        `,
        [userId, artistId]
      );

      if (existing.rows.length) {
        await client.query(
          `
          DELETE FROM user_favorites
          WHERE user_id = $1 AND artist_id = $2
          `,
          [userId, artistId]
        );

        await client.query('COMMIT');

        return { liked: false };
      }

      await client.query(
        `
        INSERT INTO user_favorites (user_id, artist_id)
        VALUES ($1, $2)
        `,
        [userId, artistId]
      );

      await client.query('COMMIT');

      return { liked: true };

    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  
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


    static async createReviewByProfileId(
      rating,
      comment,
      artist_profile_id,
      author_profile_id
    ) {
      const client = await pool.connect();
      
      try {

        await client.query('BEGIN');

        const existingReview = await client.query(
          `
            SELECT id, rating
            FROM review
            WHERE artist_profile_id = $1
              AND author_profile_id = $2
          `,
          [artist_profile_id, author_profile_id]
        )

        if (existingReview.rows.length > 0) {
          await client.query(
            `
              UPDATE review
              SET
                comment = $1,
                rating = $2,
                created_at = NOW()
              WHERE id = $3
            `,
            [
              comment, 
              rating,
              existingReview.rows[0].id
            ]
          );
        } else {
          await client.query(
            `
              INSERT INTO review (
                rating,
                comment,
                artist_profile_id,
                author_profile_id,
                created_at
              )
                VALUES ($1, $2, $3, $4, NOW())
            `,
            [rating, comment, artist_profile_id, author_profile_id]
          );
        }
        

        const agg = await client.query(
          `
            SELECT 
              COALESCE(ROUND(AVG(rating)::numeric, 2), 0) AS avg_rating,
              COUNT(*) AS reviews_count
            FROM review
            WHERE artist_profile_id = $1
          `,
          [artist_profile_id]
        );

        const { avg_rating, reviews_count } = agg.rows[0];

        await client.query(
          `
            UPDATE artist_profile
            SET rating = $1,
              reviews_count = $2
            WHERE id = $3
          `,
          [avg_rating, reviews_count, artist_profile_id]
        );

        await client.query('COMMIT');

        return {
          success: true,
          rating: avg_rating,
          reviews_count
        };

      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    };


    static async extendSubscription(client, artist_id) {
      const result = await client.query(
        `
          UPDATE artist_profile
          SET subscription_expires_at =
          CASE
            WHEN subscription_expires_at > NOW()
              THEN subscription_expires_at + interval '30 days'
            ELSE
              NOW() + interval '30 days'
          END
          WHERE id = $1
          RETURNING *
        `,
        [artist_id]
      );

      return result.rows[0];
    }
}