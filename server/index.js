import express from 'express';
import { ApolloServer } from 'apollo-server';


const app = express();
import { graphqlHTTP } from 'express-graphql';
import { schema } from './Schema/schema.js';

import { connect } from './db.js';

const server = new ApolloServer({ 
  schema
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const PORT = process.env.PORT || 5000; // Set the port to listen on

connect();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});