import React, { useState } from "react";
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         TouchableOpacity,
         Dimensions,
       } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import Center from '../components/Center';
import Colors from '../config/colors.js';

const PostingCreationScreen = props => {
  const { navigation } = props;
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  return (
    <Center style={styles.screen}>
      <Text style={styles.titleText}>
        List An Item
      </Text>
      <TouchableOpacity
        onPress={() => console.log('Add Image!')}
      >
        <AntDesign
          size={150}
          name='pluscircleo'
        />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Item Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setItemName(text)}
          multiline={true}
        >
        </TextInput>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>Item Description</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setItemDescription(text)}
          multiline={true}
          numberOfLines={5}
        >
        </TextInput>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          console.log('Posting Created!')
        }}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </Center>

  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.light_shade2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
  },
  submitButton: {
    width: '80%',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 5,
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  }
});

export default PostingCreationScreen;
