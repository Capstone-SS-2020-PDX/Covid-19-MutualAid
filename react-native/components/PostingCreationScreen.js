import React from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import colors from '../config/colors.js';

function PostingCreationScreen({ navigation }) {
  const [value, onChangeText] = React.useState();

  return (
    <View style={styles.container}>
      <Text>Create a Post</Text>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button
        title="Go to Create Post... again"
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

export default PostingCreationScreen;