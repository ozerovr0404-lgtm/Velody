import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";
import cors from '@fastify/cors';

const app = fastify({ logger: true });


await app.register(cors, {
  origin: "http://localhost:5173"
});


app.get('/', async() => {
  return { message: "Server is running" }
});


app.register(authRoutes, { prefix: '/api/auth' });


app.listen({ port: 3000 });