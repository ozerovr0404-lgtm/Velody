import { Payments } from "../../models/Payments.js";
import { createYooKassaPayment } from "../yookassa/createYooKassaPayment.js";

export const createPaymentService = async (data) => {

    const paymentData = {
      artist_id: data.artist_id,
      amount: 1000,
      status: "PENDING"
    };

    const payment = await Payments.createPayment(paymentData);

    const yooPayment = await createYooKassaPayment({
      amount: payment.amount,
      description: 'Подписка Velody Premium'
    });

    await Payments.attachYooKassaPaymentId(
        payment.id,
        yooPayment.id
    );

    return {
      success: true,
      payment_id: payment.id,
      payment_url: yooPayment.confirmation.confirmation_url
    };
};