import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";

import Center from '../components/Center';
import Colors from '../config/colors.js';

const PostingCreationScreen = props => {
  const { navigation } = props;

  const [value, onChangeText] = useState();

  return (
    <Center style={styles.screen}>
      <Text style={styles.titleText}>
        List An Item
      </Text>
    </Center>


  //   <View style={styles.container}>
  //     <Text>Create a Post</Text>
  //     <TextInput
  //       style={{ borderColor: 'gray', borderWidth: 1 }}
  //       onChangeText={text => onChangeText(text)}
  //       value={value}
  //     />
  //     <Button
  //       title="Go to Create Post... again"
  //       onPress={() => navigation.navigate('Create')}
  //     />
  //   </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light_shade2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
  }
});

export default PostingCreationScreen;
