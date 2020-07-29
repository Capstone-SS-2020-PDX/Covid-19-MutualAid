import React, { useState, useRef, useContext } from "react";
import { StyleSheet,
         Text,
         TextInput,
         View,
         ScrollView,
         Platform,
       } from "react-native";

import RNPickerSelect from 'react-native-picker-select';

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

const isAndroid = Platform.OS === 'android';

const PostingCreationScreen = props => {
  const { navigation } = props;
  const { user } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRequestSelected, setIsRequestSelected] = useState(true);
  const [isGoodSelected, setIsGoodSelected] = useState(true);

  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const itemCountInputRef = useRef(null);

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
    const categoryValue = isGoodSelected ? 'goods' : 'services';
    const requestValue = isRequestSelected ? true : false;
    const location = user.profile.home_location;

    const data = new FormData();

    if (selectedImage) {
      data.append('item_pic', selectedImage);
    }

    data.append('title', itemName);
    data.append('desc', itemDescription);
    data.append('count', itemCount);
    data.append('owner', user.user.id);
    data.append('category', categoryValue);
    data.append('request', requestValue);
    data.append('in_community', user.profile.home);
    data.append('location', location);
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
        console.log('Post Request: \n')
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

    setIsRequestSelected(true);
    setIsGoodSelected(true);

    nameInputRef.current.clear();
    descriptionInputRef.current.clear();
    itemCountInputRef.current.clear();

  };

  // Navigates to the Home Screen stack when called
  const navigateToHomeStack = () => {
    navigation.navigate('Home', {screen: 'Feed'})
  }

  const changeType = (value) => {
    switch (value) {
      case 'r':
        setIsRequestSelected(true);
      break;
      case 'o':
        setIsRequestSelected(false);
      break;
    }
  };

  const changeCategory = (value) => {
    switch (value) {
      case 'g':
        setIsGoodSelected(true);
      break;
      case 's':
        setIsGoodSelected(false);
      break;
    }
  }

  const selectImage = imageData => {
    // console.log("In selectImage: " + JSON.stringify(imageData));
    setSelectedImage(imageData);
  };
  const Wrapper = (windowHeight > 650) ? View : ScrollView;

  const onKeyPress = (key) => {
    if (key === 'Enter') {
      descriptionInputRef.current.blur();
    }
  }

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
              blurOnSubmit={false}
              onChangeText={text => setItemName(text)}
              ref={nameInputRef}
              onSubmitEditing={() => descriptionInputRef.current.focus()}
            />
          </View>
          <View style={{...styles.inputView, ...styles.descriptionInput}}>
            <TextInput
              style={styles.inputText}
              placeholder='Item Description...'
              placeholderTextColor={Colors.placeholder_text}
              keyboardType='default'
              returnKeyType='done'
              blurOnSubmit={true}
              multiline={true}
              maxLength={255}
              numberOfLines={3}
              onKeyPress={nativeEvent => onKeyPress(nativeEvent.key)}
              onChangeText={text => setItemDescription(text)}
              ref={descriptionInputRef}
            />
          </View>
          <View style={styles.pickerRow}>

            <View style={isAndroid ? styles.pickerViewAndroid : {...styles.inputView, ...styles.pickerViewiOS}}>
              <RNPickerSelect
                    placeholder={{}}
                    items={[
                      {label: 'Request', value: 'r'},
                      {label: 'Offer', value: 'o'},
                    ]}
                    onValueChange={
                      value =>
                      {if (value == null) {
                        setIsRequestSelected(previousState => previousState);
                      }
                      else {
                        changeType(value);
                      }
                    }}
                  />
            </View>
            <View style={isAndroid ? styles.pickerViewAndroid : {...styles.inputView, ...styles.pickerViewiOS}}>
              <RNPickerSelect
                style={styles.picker}
                    placeholder={{}}
                    items={[
                      {label: 'Goods', value: 'g'},
                      {label: 'Services', value: 's'},
                    ]}
                    onValueChange={
                      value =>
                      {if (value == null) {
                        setIsGoodSelected(previousState => previousState);
                      }
                      else {
                        changeCategory(value);
                      }
                    }}
              />
            </View>
          </View>
          <View style={styles.countView}>
            <View style={styles.countInputTitle}>
                <Text style={styles.countInputTitleText}>
                  Quantity
                </Text>
              </View>
            <View style={styles.countInputView}>
              <TextInput
                style={styles.countInputText}
                placeholderTextColor={Colors.placeholder_text}
                keyboardType='numeric'
                returnKeyType='done'
                value={itemCount.toString()}
                onChangeText={text => setItemCount(text)}
                ref={itemCountInputRef}
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
    marginBottom: windowHeight / 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: windowHeight / 40,
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
  },
  inputText: {
    width: '90%',
    paddingVertical: 10,
    color: Colors.dark_shade1,
  },
  countView: {
    alignItems: 'center',
    marginHorizontal: windowWidth/18,
  },
  countInputTitle: {
    alignItems: 'center',
    marginBottom: 10,
  },
  countInputTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  countInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,

    backgroundColor: Colors.light_shade4,
    borderRadius: 10,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
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
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pickerViewiOS: {
    width: '45%',
    paddingTop: 15,
    marginBottom: windowHeight / 75,
  },
  pickerViewAndroid: {
    width: '45%',
    marginBottom: windowHeight / 75,
  },
  pickerTitle: {
    flex: 0.5,
  },
  pickerTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
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
