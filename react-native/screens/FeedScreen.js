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
import PostingList from '../components/PostingList';

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
        console.log(json.length);
        setPostings(json);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false)
      });
  }, []);


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
          : <PostingList
              postings={postings}
              navigation={navigation}
            />
      }
    </Center>
  );
};

const styles = StyleSheet.create({
});

export default Feed;
