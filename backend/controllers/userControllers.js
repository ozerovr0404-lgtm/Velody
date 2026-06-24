import { getUserById } from '../services/users/getUserById.js'
import { getUserProfile } from '../services/users/getUserProfile.js';

export const getUser = async (request, reply) => {
  try {
    const { id } = request.params;

    const user = await getUserById(id);

    return reply.code(200).send({
      message: 'Пользователь найден!',
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Не удалось найти пользователя!', err.message);

    return reply.code(404).send({
      error: err.message
    });
  }
};

export const getProfile = async (request, reply) => {
    console.log("HIT BACKEND /actor/profile/:id", request.params);

  try {
    const { id } = request.params;

    const user = await getUserProfile(id);

    return reply.code(200).send({user});
    
  } catch (err) {
    console.error('Не удалось найти профиль пользователя!', err.message);

    return reply.code(400).send({
      error: err.message
    });
  }
}