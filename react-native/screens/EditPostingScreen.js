import React, { useContext, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { View,
         ScrollView,
         Text,
         TextInput,
         Button,
         Picker,
         TouchableOpacity,
         Platform,
         StyleSheet
       } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import { Formik } from "formik";
import * as Yup from "yup";

import { notifyMessage } from '../components/CustomToast';
import { showModal, hideModal } from '../components/CustomModal';
import Center from '../components/Center';
import Colors from '../config/colors';
import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';
import { postings_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const handleUpdatePosting = async (url, data) => {
  console.log("Outgoing payload: " + JSON.stringify(data));

  return fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'multipart/form-data',
    },
    body: data,
  })
    .then(response => {
      // console.log(response.status);
      return response.json();
    })
    .then(json => {
      // console.log(json);
    })
    .finally(() => {
      hideModal();
      notifyMessage('Posting Updated Successfully!');
    });
};


const EditPostingScreen = props => {
  const { route, navigation } = props;
  const { communities, user, deletePosting } = useContext(AuthContext);
  const availableCommunities = communities.filter(community => user.profile.member_of.includes(community.id));

  const isAndroid = Platform.OS === 'android' ? true : false;
  const postingPatchUrl = postings_url + route.params.id + '/';

  const [selectedImage, setSelectedImage] = useState(null);
  const inCommunity = communities.find(community => community.id === route.params.in_community);
  const [selectedCommunity, setSelectedCommunity] = useState(inCommunity);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formState, setFormState] = useState({
    title: route.params.title,
    desc: route.params.description,
  })
  const placeholderImage = route.params.item_pic;

  const submitEditPosting = useRef(null);
  const titleTextRef = useRef(null);
  const descriptionTextRef = useRef(null);

  const errorIcon = () => (
    <FontAwesome
      name={'exclamation-circle'}
      size={20}
      color={Colors.contrast3}
      style={styles.icon}
    />
  );

  submitEditPosting.current = () => {
    showModal('UPDATING_POSTING');

    handleUpdatePosting(postingPatchUrl, createFormData()).then(() => {
      navigation.goBack();
    });
  };

  useEffect(() => {
    navigation.setParams({submitEditPosting});
  }, []);

  const handleDeletePosting = async (url, id) => {
    showModal('DELETE_POSTING');

    return fetch(url, {
      method: 'DELETE',
    }).finally(() => {
      deletePosting(id);
      hideModal();
      navigation.goBack();
      notifyMessage('Posting Deleted Successfully!');
    });
  };

  const submitDeletePosting = () => {
    handleDeletePosting(postingPatchUrl, route.params.id);
    navigation.goBack();
  }

  const createFormData = () => {
    // const categoryValue = isCategorySwitchEnabled ? 'services' : 'goods';
    // const requestValue = isRequestSwitchEnabled ? true : false;

    const data = new FormData();

    if (selectedImage) {
      data.append('item_pic', selectedImage);
    }

    data.append('title', formState.title);
    data.append('desc', formState.desc);
    data.append('in_community', selectedCommunity.id);
    // data.append('count', itemCount);
    // data.append('owner', user.user.id);
    // data.append('category', categoryValue);
    // data.append('request', requestValue);
    // data.append('in_community', user.profile.home);

    return data;
  };

  const updateForm = (text, input) => {
    setFormState({ ...formState, [input]: text });
  };

  const getImage = () => {
    return selectedImage;
  };

  const selectImage = imageData => {
    setSelectedImage(imageData);
  };

  const renderCommunityPicker = () => {
    if (isAndroid) {
      return(
        <View style={{ alignItems: 'center'}}>
          <Text style={styles.editBodyHeader}>Community</Text>
          <View style={{...styles.inputView, ...styles.communityPickerContainer}}>
            <Picker
              style={styles.communityPicker}
              selectedValue={selectedCommunity}
              onValueChange={(itemValue, itemIndex) => setSelectedCommunity(itemValue)}
            >
              { renderCommunityPickerItems() }
            </Picker>
          </View>
        </View>
      );
    } else {
      return(null);
      // return(
      //     <View style={{...styles.inputView, flexDirection: 'column', height: 80, paddingVertical: 10}}>
      //       <Button
      //         onPress={showiOSActionSheet}
      //         title='Choose Home Community'
      //       />
      //       <Text style={styles.text}>{selectedCommunity.name}</Text>
      //     </View>
      // );
    }
  };

  const renderCommunityPickerItems = () => {
    return availableCommunities.map(community =>
      <Picker.Item label={community.name} value={community} key={community.id}/>
    );
  }

  const onKeyPress = (key) => {
    if (key === 'Enter') {
      descriptionInputRef.current.blur();
    }
  }

  return(
    <KeyboardShift>
      {() => (
        <ScrollView>
          <Center style={styles.screen}>
            <View style={styles.editContent}>
              <View style={styles.imageContainer}>
                <CustomImagePicker
                  iconName='images'
                  onSelectImage={selectImage}
                  getImage={getImage}
                  setImage={setSelectedImage}

                  placeholderImage={placeholderImage}
                />
              </View>
              <Text style={styles.editBodyHeader}>Title</Text>
              <TextInput
                style={styles.editTextInput}
                onChangeText={text => updateForm(text, 'title')}
                returnKeyType='next'
                blurOnSubmit={false}
                ref={titleTextRef}
                onSubmitEditing={() => descriptionTextRef.current.focus()}
              >
                {route.params.title}
              </TextInput>
            </View>
            <View style={styles.editContent}>
              <Text style={styles.editBodyHeader}>Description</Text>
              <TextInput
                style={styles.editTextInput}
                onChangeText={text => updateForm(text, 'desc')}
                blurOnSubmit={true}
                onKeyPress={nativeEvent => onKeyPress(nativeEvent.key)}
                multiline={true}
                ref={descriptionTextRef}
              >
                {route.params.description}
              </TextInput>
              { renderCommunityPicker() }
              <CustomButton
                onPress={() => submitDeletePosting()}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete Posting</Text>
              </CustomButton>
            </View>
          </Center>
        </ScrollView>
      )}
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.light_shade4,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  editContent: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  editBodyHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editTextInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: 'gray',
    fontSize: 18,
    padding: 10,
    borderRadius: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
  },
  communityPickerContainer: {
    // width: '80%',
    width: 300,
    alignItems: 'center',
  },
  communityPicker: {
    height: 50,
    width: '80%',
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  },
  deleteButton: {
    backgroundColor: Colors.contrast3,
    marginTop: 20,
  },
});

export default EditPostingScreen;
