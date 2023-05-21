import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './Schema/schema.js';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: 'https://kanban-todos-api.onrender.com',
  credentials: true,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startServer().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});