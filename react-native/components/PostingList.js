import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';

import PostingListItem from '../components/PostingListItem';

const PostingList = props => {
    const { postings, navigation } = props;

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
              owner={itemData.item.owner}
              moderatorView={props.moderatorView}
              onSelectPosting={() => {
                  navigation.navigate('PostingDetail', {
                    title: itemData.item.title,
                    description: itemData.item.desc,
                    userId: itemData.item.userId,
                    id: itemData.item.id,
                    category: itemData.item.category,
                    count: itemData.item.count,
                    owner: itemData.item.owner,
                    created_on: itemData.item.created_on,
                    item_pic: itemData.item.item_pic,
                    request: itemData.item.request,
                    in_community: itemData.item.in_community,
                    moderatorView: props.moderatorView,
                    location: itemData.item.location,
                    flagged: itemData.item.flagged,
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
      data={postings}
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
