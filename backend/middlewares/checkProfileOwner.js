export const checkProfileOwner = (getProfileId) => {
  return (request, reply, done) => {
    const sessionUser = request.session.user;

    if (!sessionUser) {
      return reply.code(401).send({
        error: "Не авторизован"
      });
    }

    const profileId = Number(getProfileId(request));

    if (sessionUser.profileId !== profileId) {
      return reply.code(403).send({
        error: "Недостаточно прав"
      });
    }

    done();
  };
};