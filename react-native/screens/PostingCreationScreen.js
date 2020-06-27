import React, { useState } from "react";
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         ToastAndroid,
         Image,
         Platform,
         AlertIOS,
       } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

import { windowHeight, windowWidth } from '../config/dimensions';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import Colors from '../config/colors.js';


const url = "https:cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";

const PostingCreationScreen = props => {
  const { navigation } = props;
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const height = useHeaderHeight();

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
      navigateToHomeStack();
    })
    .catch(error => console.error(error));
  }

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [1,1],
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
  };

  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  }

  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
    notifyMessage("Success");

    console.log("in navigateToHomeStack");
  }

  const renderImageSection = () => {
    if (selectedImage !== null) {
      return(
        <Image source={{ uri: selectedImage.localUri }} style={styles.image} />
      );
    } else {
      return(
        <AntDesign
          size={100}
          name='pluscircleo'
        />
      );
    }
  }


  return (
    <Center style={styles.screen}>
      <KeyboardAwareScrollView
        style={styles}
        resetScrollToCoords={{ x: 0, y: height }}
        contentContainerStyle={styles.keyboardView}
        scrollEnabled={true}
      >
        <View style={styles.imageContainer}>
          <Text style={styles.titleText}>
            List An Item
          </Text>
          <TouchableOpacity
            onPress={openImagePickerAsync}
          >
            {renderImageSection()}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.headerText}>Item Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setItemName(text)}
            multiline={false}
          >
          </TextInput>
          <Text style={styles.headerText}>Item Description</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setItemDescription(text)}
            multiline={true}
            numberOfLines={3}
            maxLength={180}
            maxHeight={120}
          >
          </TextInput>
        </View>

        <CustomButton
          onPress={() => sendPostRequest()}
          style={{marginBottom: 10}}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </CustomButton>
      </KeyboardAwareScrollView>
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
  keyboardView: {
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.8,
    height: windowHeight *0.7
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20
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
  },
  image: {
    width: 200,
    height: 200,
  }
});

export default PostingCreationScreen;
