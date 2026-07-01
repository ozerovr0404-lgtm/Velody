import { getCatalogProfiles } from "../services/users/getPublishedUserProfile.js";

export const getPublishedProfile = async (request, reply) => {
  try {

    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 6;
    console.log({ page, limit });

    const profile = await getCatalogProfiles(true, page, limit);

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