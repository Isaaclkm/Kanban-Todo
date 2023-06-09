import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { disableReactDevtools } from '@fvilers/disable-react-devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const client = new ApolloClient({
  uri: `${backendUrl}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'cache-first',
    },
  },
});
// This will ensure that every time a query is made, it will fetch the latest data from the server instead of using cached data.









root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
          <App/>
     </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

