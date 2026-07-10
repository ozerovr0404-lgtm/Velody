import { createPaymentService } from "../services/payments/createPaymentService.js";
import { successPaymentService } from "../services/payments/successPaymentService.js";
import { webhookPaymentService } from "../services/payments/webhookPaymentService.js";
import { createYooKassaPayment } from "../services/yookassa/createYooKassaPayment.js";

export const createPaymentController = async (request, reply) => {
  try {
    const result = await createPaymentService(request);

    console.log('SESSION', request.session);
    return reply.code(201).send(result)
  } catch (err) {
    console.error(err);
    return reply.code(500).send({
      message: err.message
    });
  }
};

export const successPaymentController = async (request, reply) => {
  try {
    if (!request.body.payment_id) {
      return reply.code(400).send({
        message: 'payment_id is required'
      });
    }

    const result = await successPaymentService(request.body);

    return reply.code(200).send(result);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({
      message: err.message
    });
  }
};


export const testYooKassaController = async (request, reply) => {
    try {
      const payment = await createYooKassaPayment({
        amount: 1000,
        description: "Тестовая подписка"
      });

      return reply.code(200).send(payment);

    } catch (err) {

      console.error('YOUKASSA ERROR:');
      console.error(err);

      return reply.code(500).send({
        message: err.message,
        stack: err.stack
      });
    }
}


export const yooKassaWebhookController = async (request, reply) => {
  try {
    console.log("YOOKASSA WEBHOOK", request.body);

    const result = await webhookPaymentService(request.body);

    if (!request.body) {
      return reply.code(400).send({
        message: "Empty webhook body"
      });
    }

    return reply.code(200).send(result);

  } catch (err) {
    console.error(err);

    return reply.code(500).send({
      message: err.message
    });
  }
}