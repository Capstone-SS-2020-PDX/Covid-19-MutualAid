import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import PostingListItem from '../components/PostingListItem';

const PostingList = props => {
    const { postings, navigation } = props;

    const renderPostingListItem = itemData => {
        return(
            <PostingListItem
              title={itemData.item.title}
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
                  });
              }}
            />
        );
    };

  return(
    <FlatList
      style={styles.list}
      renderItem={renderPostingListItem}
      keyExtractor={(itemData, i) => i.toString()}
      data={postings}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default PostingList;
