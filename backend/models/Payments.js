import pool from "../bd.js";

export class Payments {

    static async createPayment(data) {

    const {
        artist_id,
        amount,
        status
    } = data;

    const result = await pool.query(
        `
        INSERT INTO payments
        (
          artist_id,
          amount,
          status
        )
        VALUES
        ($1,$2,$3)
        RETURNING *
        `,
        [
          artist_id,
          amount,
          status
        ]
    );

    return result.rows[0];
  }

  static async updatePaymentStatusById(client, 
    {
      payment_id,
      status
    }
  ) {
    const result = await client.query(
      `
        UPDATE payments
        SET
          status = $2,
          paid_at = NOW()
        WHERE id = $1
        RETURNING *
      `,
      [payment_id, status]
    );

    return result.rows[0];
  };


  static async updatePaymentStatusByYooKassaId(
    client, 
    {
      yookassa_payment_id,
      status
    }
  ) {
    const result = await client.query(
      `
        UPDATE payments
        SET
          status = $2,
          paid_at = NOW()
        WHERE 
          yookassa_payment_id = $1
          AND COALESCE(status,'') <> 'SUCCEEDED'
        RETURNING *
      `,
      [yookassa_payment_id, status]
    );

    return result.rows[0];
  }


  static async getPaymentById(client, payment_id) {
    const result = await client.query(
      `
        SELECT *
        FROM payments
        WHERE id = $1
      `,
      [payment_id]
    );

    return result.rows[0];
  }


  static async getPaymentByYooKassaId(client, id) {
    const result = await client.query(
      `
        SELECT *
        FROM payments
        WHERE yookassa_payment_id = $1
      `, [id]
    );

    return result.rows[0];
  }


  static async attachYooKassaPaymentId(
    payment_id,
    yookassa_payment_id
  ) {
    const result = await pool.query(
      `
        UPDATE payments
        SET yookassa_payment_id = $2
        WHERE id = $1
        RETURNING *
      `,
      [
        payment_id,
        yookassa_payment_id
      ]
    );

    return result.rows[0];
  }
}