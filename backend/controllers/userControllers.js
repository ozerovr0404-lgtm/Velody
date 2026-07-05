import { getUserById } from '../services/users/getUserById.js'
import { getUserProfile } from '../services/users/getUserProfile.js';
import { getArtPositions } from '../services/users/getUserPositions.js';
import { updateUserProfile } from '../services/users/updateUserProfile.js';
import { getGenresList } from '../services/users/getGenresList.js';
import { getReviewsByArtistProfileId } from '../services/users/getArtistReviews.js';


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
  try {
    const { id } = request.params;

    const user = await getUserProfile(id);

    return reply.send(user);

  } catch (err) {
    console.error(err);
    return reply.code(400).send({ error: err.message });
  }
};

export const getArtistPositions = async (request, reply) => {

  try {
    const positions = await getArtPositions();
    return reply.code(200).send({positions});
  } catch (err) {
    return reply.code(400).send({
      error: err.message
    });
  }
};

export const getGenresForProfile = async (request, reply) => {
  try {
    const genres = await getGenresList();
    return reply.code(200).send({genres});
  } catch (err) {
    return reply.code(400).send({
      error: err.message
    });
  }
};

export const updateProfile = async (request, reply) => {

  try {

    const { id } = request.params;

    const updatedProfile = await updateUserProfile(
      id,
      request.body
    );
    return reply.code(200).send(
      updatedProfile
    );
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({
      error: err.message,
      stack: err.stack
    });
  }
};

export const getReviewsByArtistProfile = async (request, reply) => {
    try {
      const { id } = request.params;

      const reviews = await getReviewsByArtistProfileId(id);

      return reply.code(200).send({reviews});

    } catch (err) {
      return reply.code(500).send({
        message: err.message
      })
    }
  }