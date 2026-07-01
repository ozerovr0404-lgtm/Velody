export const validate = (schema, property = "body") => {
  return async (request, reply) => {
    const result = schema.safeParse(request[property]);

    if (!result.success) {
      return reply.code(400).send({
        message: "Validation error!",
        errors: result.error.flatten()
      });
    }

    request[property] = result.data;
  };
};