import React, { useContext, useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';

import CommunityListItem from './CommunityListItem';
import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';


const CommunityList = props => {
  const { navigation, communities } = props;
  const { user } = useContext(AuthContext);

  const renderCommunityListItem = itemData => {
    return(
      <View style={styles.list}>
        <CommunityListItem
          name={itemData.item.name}
          home_pic={itemData.item.home_pic}
          members={itemData.item.members}
          postings={itemData.item.posts}
          id={itemData.item.id}
          onSelectCommunity={() => {
            console.log(itemData.item.id + ' selected');
          }}
        />
      </View>
    );
  };

  return(
    <FlatList
      style={styles.list}
      renderItem={renderCommunityListItem}
      keyExtractor={(itemData, i) => i.toString()}
      data={props.communities}
      showsVerticalScrollIndicator={false}
      /* refreshControl={ */
      /*   <RefreshControl */
      /*     refreshing={props.isLoading} */
      /*     onRefresh={props.onRefresh} */
      /*   /> */
      /* } */
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
});

export default CommunityList;
