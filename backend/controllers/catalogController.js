import { getCatalogProfiles } from "../services/users/getPublishedUserProfile.js";

export const getPublishedProfile = async (request, reply) => {
  try {
    const profile = await getCatalogProfiles(true);

    return reply.code(200).send({
      message: 'Публикации получены!',
      data: profile
    });
  } catch (err) {

    console.log('FULL ERROR:');
    console.log(err);
    return reply.code(500).send({
      error: err.message
    });
  }
};