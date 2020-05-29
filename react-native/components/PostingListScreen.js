import React from "react";
import { StyleSheet, FlatList, Text, View, Button } from "react-native";


function PostingListScreen({ route, navigation }) {
  const { renderData } = route.params;

  return (
    <View style={styles.default_view}>
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
    backgroundColor: '#ffffff',
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