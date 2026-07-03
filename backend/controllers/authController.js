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
    const result = await loginUser(request.body);

    request.session.user = {
      id: result.user.id,
      email: result.user.email,
      profileId: result.profile.id
    };

    return reply.code(200).send({
      message: 'Авторизация успешна!',
      user: request.session.user
    });

  } catch (err) {
    console.error("Ошибка авторизации", err.message);
    
    return reply.code(400).send({
      message: err.message
    })
  }
};


export const me = async (request, reply) => {
  if (!request.session.user) {
    return reply.code(401).send({
      user: null
    });
  }

  return reply.send({ user: request.session.user });
};


export const logout = async (request, reply) => {
  request.session.destroy();
  return reply.send({ ok: true });
}