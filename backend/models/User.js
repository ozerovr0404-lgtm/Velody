import pool from "../bd.js";

export class User {
  constructor({ id, email, password, stage_name, phone, role, status, created_at }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.stage_name = stage_name;
    this.phone = phone;
    this.role = role;
    this.status = status;
    this.created_at = created_at;
  }

  static async getById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
      if (!result.rows[0]) return null;
      return new User(result.rows[0]);
  }

  static async getProfileById(id) {
    const result = await pool.query(
      `SELECT
          u.id AS user_id,
          u.email,
          p.id AS profile_id,
          p.stage_name,
          p.description,
          p.experience_years,
          p.city,
          p.price_from,
          ph.url AS avatar_url
        FROM artist_profile p
        LEFT JOIN users u ON p.user_id
        LEFT JOIN LATERAL (
          SELECT url
          FROM artist_photo ph
          WHERE ph.artist_profile_id = p.id
          ORDER BY ph.order_index ASC
          LIMIT 1
        ) ph ON true
        WHERE u.id = $1`, 
      [id]
    );
    if (!result.rows[0]) return null;
    return result.rows[0];
  }

  static async getByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async getProfileByUserId(userId) {
    const result = await pool.query(
      `SELECT * FROM artist_profile WHERE user_id = $1`,
      [userId]
    );

    return result.rows[0] ?? null;
  }

  static async createWithHashedPassword({
    email, 
    password, 
    stage_name, 
    phone
  }) {

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        `INSERT INTO users
        (email, password, stage_name, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [email, password, stage_name, phone]
      );

      const user = result.rows[0];

      const profileResult = await client.query(
        `INSERT INTO artist_profile (user_id, stage_name)
        VALUES ($1, $2)
        RETURNING *`,
        [user.id, user.stage_name]
      );

      const profile = profileResult.rows[0];

      await client.query('COMMIT');

      return {
        user: {
          id: user.id,
          email: user.email
        },
        profile
      }
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  static async getEmailById(id) {
    const result = await pool.query(
      `
        SELECT
          u.email,
          u.stage_name
        FROM artist_profile p
        JOIN users u
          ON u.id = p.user_id
        WHERE p.id = $1
      `,
      [id]
    );
    return result.rows[0];
  }
}