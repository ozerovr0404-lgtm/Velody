import pool from "../bd.js";

export class User {
  constructor({ id, email, password, name, phone, avatar_url, role, status, created_at }) {
    this.id = id,
    this.email = email;
    this.password = password,
    this.name = name,
    this.phone = phone,
    this.avatar_url = avatar_url,
    this.role = role,
    this.status = status,
    this.created_at = created_at
  }

  static async create({ email, password, name, phone, role, status = 'ACTIVE' }) {
    const result = await pool.query(
      `INSERT INTO users (email, password, name, phone, role, status)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [email, password, name, phone, role, status]
    );
    return new User(result.rows[0]);
  }

  static async getById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
      if (!result.rows[0]) return null;
      return new User(result.rows[0]);
  }

  static async getByEmail(email) {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (!result.rows[0]) return null;
    return new User(result.rows[0]);
  }

  static async createWithHashedPassword({
    email, 
    password, 
    name, 
    phone, 
    role, 
    status = 'ACTIVE'
  }) {
    const result = await pool.query(
      `INSERT INTO users
      (email, password, name, phone, role, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [email, password, name, phone, role, status]
    );

    return new User(result.rows[0]);
  }
}