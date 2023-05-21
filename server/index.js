import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './Schema/schema.js';
import cors from 'cors';
import { connect } from './db.js'

const app = express();

const corsOptions = {
  origin: 'https://kanban-todos.onrender.com',
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

startServer().then(async () => {
  const PORT = process.env.PORT || 5000;

  try {
    await connect(); // Call your connection function
    console.log('Connected to the database');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log('Failed to connect to the database:', error);
  }
});