import express from 'express';
import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './Schema/schema.js';
// import {typeDefs} from './Schema/schema.js';
// import {resolvers} from './Schema/resolver.js'


const app = express();
// import { schema } from './Schema/schema.js';


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

// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true
// }));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});