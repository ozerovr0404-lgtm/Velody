import pool from "../bd.js";

export class ArtistGenres {
  static async getAll() {
    const result = await pool.query(`
      SELECT id, name AS name
      FROM genre
      ORDER BY name ASC
    `);

    return result.rows;
  }
}