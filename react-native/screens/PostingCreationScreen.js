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
         Modal,
         ActivityIndicator,
         Alert,
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
  const [emailText, setEmailText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const itemCountInputRef = useRef(null);

  const height = useHeaderHeight();


  const handlePostCreation = () => {
    if(!isProcessing) {
      setIsProcessing(true);
      sendPostRequest()
    } else {
      console.log('processing, please wait');
    }
  };

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
    data.append('email', emailText);

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
        resetFormState();
        navigateToHomeStack();
      })
      .catch(error => {
        notifyMessage('Oops! Something went wrong...');
        console.log(error)
      })
      .finally(() => {
      });
  };

  // Handles letting the user select an image from their library
  const openCameraAsync = async () => {
    let cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    let libraryPermission = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!cameraPermission.granted  || !libraryPermission.granted) {
      alert('Permission to access camera and library is required!');
      return;
    }

    let cameraResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [1,1],
      resizeMethod: 'contain'
    });

    if (cameraResult.cancelled === true) {
      return;
    }

    let imageName = (Math.random() * 1000).toString().concat('.jpg');
    console.log(imageName);

    let resizedImage = await ImageManipulator.manipulateAsync(
      cameraResult.uri,
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
  const resetFormState = () => {
    setItemName('');
    setItemDescription('');
    setSelectedImage(null);
    setItemCount(1);
    setEmailText('');
    setIsProcessing(false);

    setIsRequestSwitchEnabled(false);
    setIsCategorySwitchEnabled(false);

    nameInputRef.current.clear();
    descriptionInputRef.current.clear();
    itemCountInputRef.current.clear();

    setIsModalVisible(false);
  };

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

  // Renders either the image returned from the image picker or an icon
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
  const selectImageOption = () => {
    Alert.alert(
      "Image Upload",
      "Upload a picture from your camera roll, or take one with your camera",
      [
        {
          text:"Cancel",
          style: "cancel"
        },
        
        {
          text: "Open Camera",
          onPress: () => openCameraAsync()
        },
        {
          text: "Camera Roll",
          onPress: () => openImagePickerAsync()
        }
      ],
      { onDismiss: () => {} }
    )
  }
  return (
    <Center style={styles.screen}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: height }}
        contentContainerStyle={styles.keyboardView}
        scrollEnabled={true}
      >
        <View style={styles.imageContainer}>
          <TouchableOpacity
            onPress={selectImageOption}
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
              maxLength={25}
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
              keyboardType='default'
              returnKeyType='done'
              multiline={true}
              maxLength={255}
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
            onPress={() => setIsModalVisible(true)}
            style={{ marginBottom: 10, alignSelf: 'center'}}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </CustomButton>
        </View>


        <Modal
          visible={isModalVisible}
          animationType='slide'
          onRequestClose={() => console.log('modal closing')}
          onDismiss={() => console.log('modal dismissed')}
        >
          <View style={styles.postingModalViewContainer}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>
                Enter your email to complete the post!
              </Text>
            </View>

            { isProcessing
              ? <View style={styles.activityIndicator}>
                  <ActivityIndicator size='large' color={Colors.primary}/>
                </View>
              : <>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputView}>
                      <TextInput
                        style={styles.inputText}
                        placeholder='Enter your email...'
                        placeholderTextColor={Colors.placeholder_text}
                        keyboardType='email-address'
                        returnKeyType='done'
                        onChangeText={text => setEmailText(text)}
                        value={emailText}
                      />
                    </View>
                  </View>
                  <CustomButton
                    onPress={handlePostCreation}
                    style={{ marginBottom: 10, alignSelf: 'center'}}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </CustomButton>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('email entry cancelled');
                      setIsModalVisible(!isModalVisible);
                    }}
                  >
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
            }

          </View>
        </Modal>

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
  postingModalViewContainer: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10,
    padding: 10,
    backgroundColor: "white",
  },
  confirmButton: {
    marginBottom: 20,
  },
  createPostingButtonText: {
    color: 'white',
    fontSize: 24,
  },
  modalTitleContainer: {
    marginBottom: 200,
  },
  modalTitle: {
    fontSize: 40,
    textAlign: 'center',
  },
  cancelText: {
    color: Colors.contrast2,
    fontSize: 20,
  },
  activityIndicator: {
    marginTop: windowHeight / 40,
  },
});

export default PostingCreationScreen;
