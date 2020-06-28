import React, { useEffect, useState } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         StyleSheet,
         FlatList,
         ActivityIndicator
       } from 'react-native';

import Center from '../components/Center';
import PostingList from '../components/PostingList';

import Colors from '../config/colors';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";

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
      .catch(error => console.log(error))
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
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='Search for an item'
                placeholderTextColor={Colors.placeholder_text}
                onChangeText={text => handleSearch(text)}
              />
            </View>
          </View>
          <PostingList
            postings={searchPostings}
            navigation={navigation}
          />
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
    marginVertical: 15,
  },
  inputView: {
    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    justifyContent: "center",
    paddingHorizontal: 20,
    shadowColor: Colors.dark_shade1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    height: 50,
    color: Colors.dark_shade1,
  },
});

export default Feed;
