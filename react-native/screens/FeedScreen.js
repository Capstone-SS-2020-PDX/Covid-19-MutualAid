import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import faker from 'faker';
import axios from 'axios';

import Center from '../components/Center';
import PostingListItem from '../components/PostingListItem';

const url = "https://cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";

const Feed = props => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [postings, setPostings] = useState([]);

  // useEffect(() => {
  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     }
  //   })
  //     .then(response => response.text())
  //     .then(text => {
  //       console.log(text);
  //     })
  //     .catch(error => console.error(error))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   axios.get(url)
  //        .then(response => {
  //          console.log(response);
  //        })
  //        .catch(error => console.log(error))
  // }, []);

  const renderPostingListItem = itemData => {
    return(
      <PostingListItem
        title={itemData.item}
        onSelectPosting={() => {
          navigation.navigate('PostingDetail', {
            name: itemData.item,
          });
        }}
      />
    );
  };

  return(
    <Center>
      <FlatList
        style={styles.list}
        renderItem={renderPostingListItem}
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
