import pool from "../bd.js";

export class ArtistProfile {
  static async getByPublishedIsTrue(is_published) {

    if (typeof is_published !== "boolean") {
      throw new Error('is_published must be boolean');
    }
    
    const result = await pool.query(
      `SELECT 
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

    GROUP BY 
      p.id,
      ph.url
    `,
    [is_published]
  );
    if (!result.rows.length) return null;
    return result.rows;
  }
}