import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import NewsFragment from '../component'

const client = new ApolloClient({ uri: 'http://localhost:4001/graphql', cache: new InMemoryCache() });
const NEWS = gql`
query {
  news {
    ... NewsFragment
  }
}
${NewsFragment.fragment}
`;

function News() {
  const { loading, error, data } = useQuery(NEWS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error.toString())
    return <p>`Error : ${error.message}`</p>;
  }

  return data.news.map((obj) => (
    <div key={obj.id}>
      {console.log(obj.id)}
      {
        React.createElement(
          NewsFragment.web,
          {
            ...{obj},
            key: obj.id
          }
        )
      }
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <News/>
    </div>
  );
}

render(
  <ApolloProvider client={client} addTypename={true}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// console.log('hey ho')