import pool from "../../bd.js";
import { Payments } from "../../models/Payments.js";
import { ArtistProfile } from "../../models/ArtistProfile.js";

export const webhookPaymentService = async (payload) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const event = payload.event;

    console.log('YOOKASSA EVENT:', event);

    if (event !== 'payment.succeeded') {
      await client.query('COMMIT');

      return {
        success: true,
        message: "Event ignored"
      };
    }

    const yookassaPaymentId = payload.object.id;

    const existingPayment = await Payments.getPaymentByYooKassaId(client, yookassaPaymentId);

    if (!existingPayment) {
      throw new Error("Payment not found");
    }

    if (existingPayment.status === "SUCCEEDED") {
      await client.query('COMMIT');

      return {
        success: true,
        message: "Already processed"
      };
    }

    const payment = await Payments.updatePaymentStatusByYooKassaId(
      client,
      {
        yookassa_payment_id: yookassaPaymentId,
        status: "SUCCEEDED"
      }
    );

    if (!payment) {
      await client.query('COMMIT');

      return {
        success: true,
        message: "Payment already processed" 
      };
    }

    const subscription = await ArtistProfile.extendSubscription(
      client,
      payment.artist_id
    );

    if (!subscription) {
      throw new Error("Artist profile not found");
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