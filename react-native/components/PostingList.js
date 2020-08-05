import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import PostingListItem from '../components/PostingListItem';
import { AuthContext } from '../providers/AuthProvider';

const PostingList = props => {
  const { navigation, searchText } = props;
  const { user, postings, postings_updated, searchMethod } = useContext(AuthContext);
  const [filteredPostings, setFilteredPostings] = useState([]);

  useEffect(() => {
    filterPostings();
  }, [props.searchText, postings_updated, user.profile.member_of]);

  const filterPostings = filterType => {
    let filtered = postings;

    // filtering by searchMethod
    if (searchMethod === 'COMMUNITY') {
      filtered = postings.filter(posting => {
        return user.profile.member_of.includes(posting.in_community);
      });

    }

    // filtering by postingListScreen type
    if (props.filterType === 'FLAGGED') {
      filtered = filtered.filter(posting => posting.flagged > 0);
    } else if (props.filterType === 'SAVED') {
      filtered = filtered.filter(posting =>
        user.profile.saved_postings.includes(posting.id));
    } else if (props.filterType === 'USER') {
      filtered = filtered.filter(posting =>
        posting.owner === user.user.id);
    }

    // search filtering
    if (searchText.length > 0) {
      filtered = filtered.filter(posting =>
        posting.title.toLowerCase().includes(
          searchText.toLowerCase()));
    }

    setFilteredPostings(filtered);
  };

  const renderPostingListItem = itemData => {
    return(
      <View style={styles.list}>
        <PostingListItem
          title={itemData.item.title}
          request={itemData.item.request}
          item_pic={itemData.item.item_pic}
          in_community={itemData.item.in_community}
          location={itemData.item.location}
          flagged={itemData.item.flagged}
          onSelectPosting={() => {
            navigation.navigate('PostingDetail', {
              ...itemData.item,
              moderatorView: props.moderatorView,
            });
          }}
        />
      </View>
    );
  };

  return(
    <FlatList
      style={styles.list}
      renderItem={renderPostingListItem}
      keyExtractor={(itemData, i) => i.toString()}
      data={filteredPostings}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props.isLoading}
          onRefresh={props.onRefresh}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default PostingList;
