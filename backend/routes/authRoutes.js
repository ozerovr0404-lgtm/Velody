import { register, login, me, logout } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

export default async function authRoutes(fastify, options) {
  fastify.post(
    '/register',
    { preHandler: validate(registerSchema) },
    register
  );

  fastify.post(
    '/login',
    { preHandler: validate(loginSchema) },
    login
  );

  fastify.get(
    '/me',
    me
  );

  fastify.post(
    '/logout',
    logout
  );
};