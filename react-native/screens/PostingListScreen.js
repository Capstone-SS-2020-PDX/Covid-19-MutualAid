import React from "react";
import { StyleSheet, FlatList, Text, View, Button } from "react-native";

import Colors from '../config/colors.js';

function PostingListScreen({ route, navigation }) {
  const { renderData } = route.params;

  return (
    <View style={styles.container}>
      <Text>Posting List</Text>
      <FlatList
        data={renderData}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor = { (item, index) => index.toString() }
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
    backgroundColor: Colors.light_shade2,
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