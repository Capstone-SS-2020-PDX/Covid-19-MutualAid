import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import faker from 'faker';

import Center from '../components/Center';
import PostingDetailScreen from './PostingDetailScreen';

const Feed = props => {
  const { navigation } = props;

  return(
    <Center>
      <FlatList
        style={ styles.list }
        renderItem={({item}) => {
          return(
            <Button
              title={item}
              onPress={() =>
                navigation.navigate('PostingDetail', {
                  name: item
                })
              }
            />
          );
        }}
        keyExtractor={(product, i) => product + i}
        data={Array.from(Array(50), () => faker.commerce.product())}
      />
    </Center>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    margin: 10,
    padding: 10,
  },
});

export default Feed;
