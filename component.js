import React from 'react';
import { Text, View } from 'react-native'
import { gql } from '@apollo/client';

const NewsFragment = {};
NewsFragment.web = ({obj}) => {
  return (
    <p>I am news. {obj.text}: {obj.files}</p>
  );
}

NewsFragment.mobile = ({obj}) => {
  return (
    <View>
      <Text>{obj.text}: {obj.files}</Text>
    </View>
  )
}

NewsFragment.fragment = gql`
    fragment NewsFragment on News {
      id
      text
      files
    }
  `
export default NewsFragment