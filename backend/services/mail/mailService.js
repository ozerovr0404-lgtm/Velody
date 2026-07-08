import { sendMail } from "./sendMail.js";
import { User } from "../../models/User.js";

export const sendContactMessage = async ({
  recipientId,
  senderName,
  senderEmail,
  message
}) => {

const recipient = await User.getEmailById(recipientId);

  if (!recipient) {
    throw new Error('Получатель не найден!');
  }

  await sendMail({
    to: recipient.email,
    replyTo: senderEmail,
    subject: `Новое сообщение от ${senderName}`,
    text: message,
    html: `
    <h3>Новое сообщение</h3>

    <p>
      От: ${senderName}
    </p>

    <p>
      ${message}
    </p>
    `
  });
};