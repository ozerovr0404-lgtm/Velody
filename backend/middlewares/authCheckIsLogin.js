export const authCheckLogin = (request, reply, done) => {
  if (!request.session.user) {
    return reply.code(401).send({ error: 'Unauthorized' });
  }

  done();
};