import { registerUser } from "../services/authServices/registerUser.js";
import { loginUser } from "../services/authServices/loginUser.js";

export const register = async (request, reply) => {
  try {
    const result = await registerUser(request.body);
    
    return reply.code(201).send({
      message: 'Пользователь зарегистрирован!',
      user: result.user,
      profile: result.profile
    });

  } catch (err) {
    console.error("Ошибка регистрации", err.message);

    return reply.code(400).send({
      error: err.message
    })
  }
};

export const login = async (request, reply) => {
  try {
    const user = await loginUser(request.body);

    return reply.code(200).send({
      message: 'Авторизация успешна!',
      user: {
        id: user.id,
        email: user.email
      }
    })

  } catch (err) {
    console.error("Ошибка авторизации", err.message);
    
    return reply.code(400).send({
      message: err.message
    })
  }
};