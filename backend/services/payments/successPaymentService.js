import pool from "../../bd.js"
import { Payments } from "../../models/Payments.js"
import { ArtistProfile } from "../../models/ArtistProfile.js"

export const successPaymentService = async ({ payment_id }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const existingPayment = await Payments.getPaymentById(
      client,
      payment_id
    );

    if (!existingPayment) {
      throw new Error('Payment not found');
    }

    if (existingPayment.status === "SUCCEEDED") {
      throw new Error('Payment already processed');
    }

    const payment = await Payments.updatePaymentStatusById(
      client,
      {
        payment_id,
        status: 'SUCCEEDED'
      }
    );

    if (!payment) {
      throw new Error('Payment not found');
    }
   
    const subscription = await ArtistProfile.extendSubscription(client, payment.artist_id);
  
    if (!subscription) {
      throw new Error('Artist profile not found');
    }

    await client.query('COMMIT');

    return {
      success: true,
      payment,
      subscription
    }

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
    
  } finally {
    client.release();
  }
};