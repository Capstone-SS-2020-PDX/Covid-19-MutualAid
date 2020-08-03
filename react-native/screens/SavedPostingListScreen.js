import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import PostingList from '../components/PostingList';
import Colors from '../config/colors';
import { windowWidth, windowHeight } from '../config/dimensions';
import { postings_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const SavedPostingListScreen = props => {
  const { navigation } = props;
  const { user, postings, updatePostings } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredPostings, setFilteredPostings] = useState([]);
  const [searchPostings, setSearchPostings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    filterPostings();
  }, [postings, user.profile.saved_postings]);

  const fetchPostings = () => {
    setIsLoading(true);

    fetch(postings_url, {
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
      .finally(() => {
        setIsLoading(false)
      });
  };

  const filterPostings = () => {
    let savedPostings = postings.filter(posting => user.profile.saved_postings.includes(posting.id));
    // console.log('Users Postings: ');
    // console.log(savedPostings);

    setFilteredPostings(savedPostings);
    setSearchPostings(savedPostings);
    setIsLoading(false);
  };

  const handleSearch = text => {
    setSearchText(text);

    let filtered = filteredPostings.filter(posting =>
      posting.title.toLowerCase().includes(text.toLowerCase())
    );

    setSearchPostings(filtered);
  };

  const handleClearSearchInput = () => {
    setSearchText('');
    setSearchPostings(filteredPostings);
    searchInputRef.current.clear();
  };

  const PostingListSection = isLoading ? <ActivityIndicator size='large'/>
        : <PostingList
            postings={searchPostings}
            navigation={navigation}
            isLoading={isLoading}
            onRefresh={fetchPostings}
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

export default SavedPostingListScreen;
