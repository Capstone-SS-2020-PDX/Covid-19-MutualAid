import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import faker from 'faker';

import Center from '../components/Center';
import Colors from '../config/colors';
import PostingListItem from '../components/PostingListItem';

const Search = props => {
  const { navigation } = props;
  const [show, setShow] = useState(false);

  const renderPostingListItem = itemData => {
    return(
      <PostingListItem
        title={itemData.item}
        onSelectPosting={ () => {
          navigation.navigate('PostingDetail', {
            name: itemData.item,
          });
        } }
      />
    );
  };

  return(
    <Center style={styles.screen}>
      <Button
        title='Search Postings'
        onPress={() => {
          setShow(!show);
        }}
      />
      { show
        ? <FlatList
            style={ styles.list }
            renderItem={renderPostingListItem}
            keyExtractor={(product, i) => product + i}
            data={Array.from(Array(50), () => faker.commerce.product())}
          />
        : null }
    </Center>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light_shade4,
  },
  list: {
    width: '100%',
    margin: 10,
    padding: 10,
  },
});

export default Search;
