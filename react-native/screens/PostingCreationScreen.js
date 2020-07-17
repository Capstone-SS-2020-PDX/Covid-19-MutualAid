import React, { useState, useRef, useContext } from "react";
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
         ActivityIndicator,
       } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useHeaderHeight } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { WToast } from 'react-native-smart-tip'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

import { showModal, hideModal } from '../components/CustomModal';
import { notifyMessage } from '../components/CustomToast';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import CustomImagePicker from '../components/CustomImagePicker';
import KeyboardShift from 'react-native-keyboardshift-razzium';

import Colors from '../config/colors.js';
import { windowHeight, windowWidth } from '../config/dimensions';
import { postings_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

// const url = "https:cellular-virtue-277000.uc.r.appspot.com/postings/?format=json";

const PostingCreationScreen = props => {
  const { navigation } = props;
  const { user } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [isRequestSwitchEnabled, setIsRequestSwitchEnabled] = useState(false);
  const [isCategorySwitchEnabled, setIsCategorySwitchEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const itemCountInputRef = useRef(null);

  const height = useHeaderHeight();

  const handlePostCreation = () => {
    if(!isProcessing) {
      setIsProcessing(true);
      showModal('CREATING_POSTING');
      sendPostRequest()
    } else {
      console.log('processing, please wait');
    }
  };

  const getImage = () => {
    return selectedImage;
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
    data.append('owner', user.user.id);
    data.append('category', categoryValue);
    data.append('request', requestValue);
    data.append('in_community', user.profile.home);

    return data;
  };

  // handle sending the request
  const sendPostRequest = () => {
    console.log(windowHeight);
    return fetch(postings_url, {
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
        hideModal();
        setIsProcessing(false);
      });
  };

  // clears the input fields and state for the input
  const resetFormState = () => {
    setItemName('');
    setItemDescription('');
    setSelectedImage(null);
    setItemCount(1);
    setIsProcessing(false);

    setIsRequestSwitchEnabled(false);
    setIsCategorySwitchEnabled(false);

    nameInputRef.current.clear();
    descriptionInputRef.current.clear();
    itemCountInputRef.current.clear();

  };

  // Navigates to the Home Screen stack when called
  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
  }

  const toggleRequestSwitch = () => {
    setIsRequestSwitchEnabled(previousState => !previousState);
  };

  const toggleCategorySwitch = () => {
    setIsCategorySwitchEnabled(previousState => !previousState);
  };

  const selectImage = imageData => {
    // console.log("In selectImage: " + JSON.stringify(imageData));
    setSelectedImage(imageData);
  };
  const Wrapper = (windowHeight > 650) ? View : ScrollView;

  return (
    <KeyboardShift>
      {() => (
      <Wrapper style={(Wrapper === ScrollView) ? {backgroundColor: Colors.light_shade4, flexGrow: 1} : styles.screen}>
      <Center style={styles.screen}>
        <View style={ (windowHeight > 650) ? styles.imageContainerBig : styles.imageContainer}>

          <CustomImagePicker
            iconName='images'
            onSelectImage={selectImage}
            getImage={getImage}
            setImage={setSelectedImage}
          />

        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder='Item Name...'
              placeholderTextColor={Colors.placeholder_text}
              maxLength={35}
              returnKeyType='next'
              onChangeText={text => setItemName(text)}
              ref={nameInputRef}
            />
          </View>
          <View style={{...styles.inputView, ...styles.descriptionInput}}>
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
          <View style={ (windowHeight > 650) ? styles.switchRowBig : styles.switchRow}>
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
                  value={'1'}
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
        </View>
        <CustomButton
          onPress={() => handlePostCreation()}
          style={styles.confirmButton}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </CustomButton>   
      </Center>
      </Wrapper>
      )}
      </KeyboardShift> 
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    flexGrow: 1,
    width: windowWidth,
    justifyContent: 'center'
  },
  keyboardView: {
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainerBig: {
    width: '100%',
    alignItems: 'center',
    marginBottom: windowHeight / 20
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: windowHeight / 40
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
    marginBottom: windowHeight/40,
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
  descriptionInput: {
    height: 80,
    alignItems: 'flex-start',
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
    marginBottom: windowHeight/40,
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
  switchRowBig: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: -(windowHeight/70)
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
  confirmButton: {
    marginBottom: 0,
  },
  createPostingButtonText: {
    color: 'white',
    fontSize: 24,
  },
  cancelText: {
    color: Colors.contrast2,
    fontSize: 20,
  },
  activityIndicator: {
    marginTop: windowHeight / 40,
  },
  confirmButton: {
    alignSelf: 'center'
  }
});

export default PostingCreationScreen;
