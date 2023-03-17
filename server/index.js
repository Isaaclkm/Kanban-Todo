import express from 'express';
const app = express();
import { graphqlHTTP } from 'express-graphql';
import { schema } from './Schema/schema.js';

import { connect } from './db.js';


const PORT = process.env.PORT || 5000; // Set the port to listen on

connect();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});