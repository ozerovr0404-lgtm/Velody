import { sendMailMessage } from "../controllers/mailControllers.js";
import { contactController } from "../controllers/mailControllers.js";

export default async function mailRoutes(app) {
  app.post('/send', contactController);
  app.post('/test', sendMailMessage);
}