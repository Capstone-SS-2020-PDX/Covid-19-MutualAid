import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import PostingListItem from '../components/PostingListItem';

const PostingList = props => {
    const { postings, navigation } = props;

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
        <FlatList
          style={styles.list}
          renderItem={renderPostingListItem}
          keyExtractor={(itemData, i) => i.toString()}
          data={postings}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        width: '100%',
        margin: 10,
        padding: 10,
    },
});

export default PostingList;
