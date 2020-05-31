import React from "react";
import { StyleSheet, FlatList, Text, View, Button } from "react-native";

import colors from '../config/colors.js';

function PostingListScreen({ route, navigation }) {
  const { renderData } = route.params;

  return (
    <View style={styles.container}>
      <Text>Posting List</Text>
      <FlatList
        data={renderData}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
      <Button
        title="Go to Create Post"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light_shade2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  default_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default PostingListScreen;