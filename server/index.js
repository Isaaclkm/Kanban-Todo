const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const PORT = process.env.PORT || 5000; // Set the port to listen on

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});