import { sendMail } from "../services/mail/sendMail.js";
import { sendContactMessage } from "../services/mail/mailService.js";
import { User } from "../models/User.js";

export const sendMailMessage = async (request, reply) => {
  try {
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: 'Тестовое письмо',
      text: 'Привет! Почта работает'
    });
    
    return reply.send({
      success: true
    });
  } catch (err) {
    console.error(err);
    return reply.code(500).send({
      success: false,
      error: err.message
    });
  }
}

export const contactController = async (request, reply) => {
  try {

    const {
      recipientId,
      message
    } = request.body;

    console.log('Получатель', recipientId);
    
    const sender = request.session?.user;

    if(!sender) {
      return reply.code(401).send({
        message: "Необходимо авторизоваться!"
      });
    }

    const senderUser = await User.getById(sender.id);

    await sendContactMessage({
      recipientId,
      senderName: senderUser.stage_name,
      senderEmail: senderUser.email,
      message
    });

    return reply.send({
      message: "Сообщение отправлено!" 
    });

  } catch (err) {
    console.error(err);

    return reply.code(500).send({
      message: err.message
    });
  }
}