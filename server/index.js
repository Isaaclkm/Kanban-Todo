import express from 'express';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './Schema/schema.js';
import cors from 'cors';
import { connect } from './db.js';

const app = express();

const corsOptions = {
  origin: 'https://kanban-todos-api.onrender.com',
  credentials: true, // if you need to include cookies or authorization headers
};
app.use(cors(corsOptions));


const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection for Apollo Server
});

server.applyMiddleware({ app, path: '/graphql' }); // Add this line to set up the '/graphql' endpoint

const PORT = process.env.PORT || 5000; // Set the port to listen on

connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}graphql`);
});