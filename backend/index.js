import fastify from "fastify";

const app = fastify({ logger: true });

app.get('/', async() => {
  return { message: "Server is running" }
});


app.listen({ port: 3000 });