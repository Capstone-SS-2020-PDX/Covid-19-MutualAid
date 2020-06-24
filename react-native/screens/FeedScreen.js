import React, { useEffect, useState } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         StyleSheet,
         FlatList,
         ActivityIndicator
       } from 'react-native';
import faker from 'faker';

import Center from '../components/Center';
import PostingList from '../components/PostingList';

import Colors from '../config/colors';

// const url = "https://cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";
const url = 'https://jsonplaceholder.typicode.com/posts';

const Feed = props => {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [postings, setPostings] = useState([]);
  const [searchPostings, setSearchPostings] = useState([]);
  const [searchText, setSearchText] = useState('');

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
        setSearchPostings(json);
      })
      .catch(error => console.error(error))
      .finally(() => {
        setIsLoading(false)
      });
  }, []);

  const handleSearch = text => {
    setSearchText(text);

    let filteredPostings = postings.filter(posting =>
      posting.title.toLowerCase().includes(text.toLowerCase())
    );

    setSearchPostings(filteredPostings);
    console.log(searchText);
    console.log(searchPostings);
  }

  return(
    isLoading
      ? <ActivityIndicator size='large'/>
      : <View style={styles.screen}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder='Search for an item'
              placeholderTextColor={Colors.dark_shade1}
              onChangeText={text => handleSearch(text)}
            />
          </View>
          <Center>
            {/* <FlatList */}
            {/*   style={styles.list} */}
            {/*   renderItem={renderPostingListItem} */}
            {/*   keyExtractor={(product, i) => product + i} */}
            {/*   data={Array.from(Array(50), () => faker.commerce.product())} */}
            {/* /> */}
            {
              <PostingList
                postings={searchPostings}
                navigation={navigation}
              />
            }
          </Center>
        </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
  },
  searchContainer: {
    width: '80%',
    backgroundColor: Colors.light_shade1,
    borderRadius: 25,
    height: 40,
    marginTop: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 30,
  },
});

export default Feed;
