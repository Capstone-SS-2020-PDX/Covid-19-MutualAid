import React, { useEffect, useState } from 'react';
import { View,
         Text,
         Button,
         StyleSheet,
         FlatList,
         ActivityIndicator
       } from 'react-native';
import faker from 'faker';

import Center from '../components/Center';
import PostingListItem from '../components/PostingListItem';

// const url = "https://cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";
const url = 'https://jsonplaceholder.typicode.com/posts';

const Feed = props => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setPostings(json);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  const renderPostingListItem = itemData => {
    return(
      <PostingListItem
        /* title={itemData.item} */
        title={itemData.item.title}
        onSelectPosting={() => {
          navigation.navigate('PostingDetail', {
            name: itemData.item.id,
            body: itemData.item.body,
            userId: itemData.item.userId,
            id: itemData.item.id,
            /* name: itemData.item, */
          });
        }}
      />
    );
  };

  return(
    <Center>
      {/* <FlatList */}
      {/*   style={styles.list} */}
      {/*   renderItem={renderPostingListItem} */}
      {/*   keyExtractor={(product, i) => product + i} */}
      {/*   data={Array.from(Array(50), () => faker.commerce.product())} */}
      {/* /> */}
      {
        isLoading
          ? <ActivityIndicator size='large'/>
          : <FlatList
              style={styles.list}
              renderItem={renderPostingListItem}
              keyExtractor={(itemData, i) => i}
              data={postings}
            />
      }
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
