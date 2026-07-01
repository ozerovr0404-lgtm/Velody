import pool from "../bd.js";

export class ArtistPosition {
  static async getAll() {
    const result = await pool.query(`
      SELECT id, position_name AS name
      FROM artist_position
      ORDER BY position_name ASC
    `);

    return result.rows;
  }
}