import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";
import cors from '@fastify/cors';
import usersRoutes from "./routes/usersRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";


const app = fastify({ logger: true });


await app.register(cors, {
  origin: "http://localhost:5173"
});


app.get('/', async() => {
  return { message: "Server is running" }
});


app.register(authRoutes, { prefix: '/api/auth' });

app.register(usersRoutes, { prefix: '/actor' });

app.register(catalogRoutes, { prefix: '/catalog' });

app.listen({ port: 3000, host: '0.0.0.0' });