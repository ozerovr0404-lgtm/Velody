import fastify from "fastify";
import authRoutes from "./routes/authRoutes.js";
import cors from '@fastify/cors';
import usersRoutes from "./routes/usersRoutes.js";
import catalogRoutes from "./routes/catalogRoutes.js";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import mailRoutes from "./routes/mailRoutes.js";
import paymentRoutes from "./routes/paymentsRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = fastify({ logger: true });


await app.register(cors, {
  origin: "http://localhost:5173",
  credentials: 'include',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']
});


app.get('/', async() => {
  return { message: "Server is running" }
});

app.register(fastifyCookie);

app.register(fastifySession, {
  secret: process.env.SESSION_SECRET,
  rolling: true,
  cookie: {
    secure: false,  // если в прод, то true и будет https/
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 2 * 60 * 60* 1000 // 2 часа
  }
});

await app.register(import("@fastify/multipart"), {
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});


app.register(authRoutes, { prefix: '/api/auth' });

app.register(usersRoutes, { prefix: '/' });

app.register(catalogRoutes, { prefix: '/catalog' });

app.register(mailRoutes,  { prefix: '/mail' });

app.register(paymentRoutes, { prefix: '/payments' });

app.register(uploadRoutes, { prefix: '/api/upload' });

await app.ready();

await app.listen({ port: 3000, host: '0.0.0.0' });