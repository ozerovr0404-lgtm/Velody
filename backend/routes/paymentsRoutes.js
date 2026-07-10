import { createPaymentController } from "../controllers/paymentController.js";
import { successPaymentController } from "../controllers/paymentController.js";
import { testYooKassaController } from "../controllers/paymentController.js";
import { yooKassaWebhookController } from "../controllers/paymentController.js";

export default async function paymentRoutes(app) {
    console.log("PAYMENT ROUTES LOADED");

  app.post('/create', createPaymentController);
  app.post('/success', successPaymentController);
  app.post('/test', testYooKassaController);
  app.post('/webhook', yooKassaWebhookController);
}