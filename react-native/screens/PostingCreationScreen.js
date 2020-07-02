import React, { useState, useRef } from "react";
import { StyleSheet,
         Text,
         TextInput,
         View,
         Button,
         Switch,
         TouchableOpacity,
         ScrollView,
         Dimensions,
         Image,
       } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { WToast } from 'react-native-smart-tip'

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
  const [itemCount, setItemCount] = useState(1);
  const [isRequestSwitchEnabled, setIsRequestSwitchEnabled] = useState(false);
  const [isCategorySwitchEnabled, setIsCategorySwitchEnabled] = useState(false);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const itemCountInputRef = useRef(null);

  const height = useHeaderHeight();

  // Create the data object in correct format to be sent off the server
  const createFormData = () => {
    const categoryValue = isCategorySwitchEnabled ? 'services' : 'goods';
    const requestValue = isRequestSwitchEnabled ? true : false;

    const data = new FormData();

    data.append('title', itemName);
    data.append('desc', itemDescription);
    data.append('item_pic', selectedImage);
    data.append('count', itemCount);
    data.append('category', categoryValue);
    data.append('request', requestValue);

    return data;
  };

  // handle sending the request
  const sendPostRequest = () => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      body: createFormData(),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        notifyMessage('Posting Sucessfully Created!');
        navigateToHomeStack();
      })
      .catch(error => {
        notifyMessage('Oops! Something went wrong...');
        console.log(error)
      })
      .finally(() => {
        clearInputs();
      });
  };

  // Handles letting the user select an image from their library
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
      resizeMethod: 'contain'
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    let imageName = (Math.random() * 1000).toString().concat('.jpg');
    console.log(imageName);

    let resizedImage = await ImageManipulator.manipulateAsync(
      pickerResult.uri,
      [
        { resize: {
          width: 1000
        }},
      ],
        { compress: 0.5 },
    )

    setSelectedImage({uri: resizedImage.uri, type: 'image/jpeg', name: imageName});
    console.log(selectedImage);
  };

  // clears the input fields and state for the input
  const clearInputs = () => {
    setItemName('');
    setItemDescription('');
    setSelectedImage(null);
    setItemCount(1);

    setIsRequestSwitchEnabled(false);
    setIsCategorySwitchEnabled(false);

    nameInputRef.current.clear();
    descriptionInputRef.current.clear();
    itemCountInputRef.current.clear();
  };

  // Displays a notification message, style dependent on platform
  const notifyMessage = msg => {
    const toastOptions = {
      data: msg,
      textColor: Colors.light_shade4,
      backgroundColor: Colors.dark_shade1,
      position: WToast.position.CENTER,
      duration: WToast.duration.SHORT,
      position: WToast.position.CENTER,
      // icon: <ActivityIndicator color='#fff' size={'large'}/>
	  }

    WToast.show(toastOptions)
  }

  // Navigates to the Home Screen stack when called
  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
  }

  // Renders either the image returned from the image picker or a plus icon
  const renderImageSection = () => {
    if (selectedImage !== null) {
      return(
        <Image source={{ uri: selectedImage.uri }} style={styles.image} />
      );
    } else {
      return(
        <FontAwesome5
          size={150}
          name='images'
        />
      );
    }
  }

  const toggleRequestSwitch = () => {
    setIsRequestSwitchEnabled(previousState => !previousState);
  };

  const toggleCategorySwitch = () => {
    setIsCategorySwitchEnabled(previousState => !previousState);
  };

  return (
    <Center style={styles.screen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: height }}
        contentContainerStyle={styles.keyboardView}
        scrollEnabled={true}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={openImagePickerAsync}
          >
            {renderImageSection()}
          </TouchableOpacity>
        </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='Item Name...'
                placeholderTextColor={Colors.placeholder_text}
                maxLength={30}
                returnKeyType='next'
                onChangeText={text => setItemName(text)}
                ref={nameInputRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='Item Description...'
                placeholderTextColor={Colors.placeholder_text}
                keyboardType='email-address'
                returnKeyType='done'
                multiline={true}
                numberOfLines={3}
                onChangeText={text => setItemDescription(text)}
                ref={descriptionInputRef}
              />
            </View>
            <View style={styles.switchRow}>
              <View style={styles.switchColumn}>
                <Text style={styles.switchTitle}>Request?</Text>
                <Switch
                  style={styles.switch}
                  onValueChange={toggleRequestSwitch}
                  value={isRequestSwitchEnabled}
                  trackColor={{ false: "#767577", true: Colors.primary }}
                  thumbColor={isRequestSwitchEnabled ? Colors.primary : "#f4f3f4"}
                />
              </View>
              <View style={styles.switchColumn}>
                <Text style={styles.switchTitle}>Count</Text>
                <View style={styles.countInputView}>
                  <TextInput
                    style={styles.countInputText}
                    keyboardType='numeric'
                    returnKeyType='done'
                    onChangeText={text => setItemCount(text)}
                    ref={itemCountInputRef}
                  />
                </View>
              </View>
              <View style={styles.switchColumn}>
                <Text style={styles.switchTitle}>Category</Text>
                <Switch
                  style={styles.switch}
                  onValueChange={toggleCategorySwitch}
                  value={isCategorySwitchEnabled}
                  trackColor={{ false: "#767577", true: Colors.primary }}
                  thumbColor={isCategorySwitchEnabled ? Colors.primary : "#f4f3f4"}
                />
              </View>
            </View>

        <CustomButton
          onPress={() => sendPostRequest()}
          style={{ marginBottom: 10, alignSelf: 'center'}}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </CustomButton>
        </View>

      </KeyboardAwareScrollView>
    </Center>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexGrow: 1,
  },
  keyboardView: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
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
    width: windowWidth/3,
    height: windowHeight/4,
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1
  },
  inputContainer: {
    width: '80%',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 20,

    shadowColor: Colors.dark_shade1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputText: {
    width: '90%',
    color: Colors.dark_shade1,
  },
  countInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.light_shade4,
    borderRadius: 10,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    height: 30,
    marginBottom: 20,
    paddingHorizontal: 20,

    shadowColor: Colors.dark_shade1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  countInputText: {
    color: Colors.dark_shade1,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: -10
  },
  switchColumn: {
    alignItems: 'center',
  },
  switchTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  switch: {
      transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});

export default PostingCreationScreen;
