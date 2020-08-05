import React, { useEffect, useContext, useState, useRef } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         StyleSheet,
         ActivityIndicator,
         TouchableOpacity,
       } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import PostingList from '../components/PostingList';
import { AuthContext } from '../providers/AuthProvider';
import Colors from '../config/colors';
import { windowWidth, windowHeight } from '../config/dimensions';
import { postings_url } from '../config/urls';


const Feed = props => {
  const { navigation } = props;
  const { user, updatePostings, searchMethod, searchRadius } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  const fetchPostings = () => {
    setIsLoading(true);

    const url = searchMethod === 'COMMUNITY' ? postings_url : generateRadiusUrl();

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
        updatePostings(json);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setIsLoading(false)
      });
  };

  const generateRadiusUrl = () => {
    let url = postings_url;
    url += '?longitude=' + '-122.084' + '&latitude=' + '37.4219983' + '&radius=' + searchRadius;
    console.log(url);
    return url;
  };

  const handleSearch = text => {
    setSearchText(text);
  };

  const handleClearSearchInput = () => {
    setSearchText('');
    searchInputRef.current.clear();
  };

  const PostingListSection = isLoading ? <ActivityIndicator size='large'/>
        : <PostingList
            navigation={navigation}
            isLoading={isLoading}
            onRefresh={fetchPostings}
            searchText={searchText}
          />

  return(
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <View style={styles.inputView}>
          <Ionicons
            name={'ios-search'}
            size={23}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Search for an item'
            placeholderTextColor={Colors.placeholder_text}
            autoCapitalize='none'
            onChangeText={text => handleSearch(text)}
            returnKeyType='done'
            ref={searchInputRef}
          />
          <TouchableOpacity
            style={styles.inputIcon}
            onPress={() => handleClearSearchInput()}
          >
            <Feather
              name={'x-circle'}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      {PostingListSection}
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
    width: '90%',
    marginVertical: windowHeight / 80,
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 10,
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
    width: '80%',
    color: Colors.dark_shade1,
  },
  inputIcon: {
    width: '10%',
  },
});

export default Feed;
