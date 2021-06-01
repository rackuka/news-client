import React from 'react';
import { SafeAreaView, Text, View } from 'react-native'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import NewsFragment from './component';


const client = new ApolloClient({ uri: 'http://192.168.1.30:4001/graphql', cache: new InMemoryCache() });
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

  if (loading) return <Text>Loading...</Text>;
  if (error) {
    console.log(error.toString())
    return <Text>`Error : ${error.message}`</Text>;
  }

  return  (
    <View>
    {
      data.news.map((obj) => (
          <NewsFragment.mobile obj={obj} key={obj.id}/>
        )
      )
    }
    </View>
    );
}

export default function App() {
  return (
    <ApolloProvider client={client} addTypename={true}>
      <SafeAreaView>
        <Text>My first Apollo app 🚀</Text>
        <News />
      </SafeAreaView>
    </ApolloProvider>
  )
}

// console.log('hey ho')