import express from 'express';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './Schema/schema.js';
import cors from 'cors';


const app = express();

const corsOptions = {
  origin: 'https://kanban-todos.onrender.com/',
  credentials: true, // if you need to include cookies or authorization headers
};
app.use(cors(corsOptions))

import { connect } from './db.js';

const server = new ApolloServer({ 
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`);
});

const PORT = process.env.PORT || 5000; // Set the port to listen on

connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});