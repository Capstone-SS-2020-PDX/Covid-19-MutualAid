import React, { useState } from "react";
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         TouchableOpacity,
         ScrollView,
         Dimensions,
       } from "react-native";
import { AntDesign } from '@expo/vector-icons';

import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import Colors from '../config/colors.js';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";

const PostingCreationScreen = props => {
  const { navigation } = props;
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const sendPostRequest = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        title: itemName,
        desc: itemDescription,
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
    })
    .catch(error => console.error(error));
  }

  return (
    <Center style={styles.screen}>
      <Text style={styles.titleText}>
        List An Item
      </Text>
      <TouchableOpacity
        onPress={() => console.log('Add Image!')}
      >
        <AntDesign
          size={100}
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
          numberOfLines={3}
        >
        </TextInput>
      </View>
      <CustomButton
        onPress={() => sendPostRequest()}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </CustomButton>
    </Center>

  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.light_shade4,
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
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  }
});

export default PostingCreationScreen;
