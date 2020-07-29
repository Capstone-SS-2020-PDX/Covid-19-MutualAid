import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Picker,
  ActionSheetIOS,
  Button,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import Dialog, { DialogContent, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';

import Colors from '../config/colors';
import { notifyMessage } from '../components/CustomToast';
import { windowWidth } from '../config/dimensions';
import { showModal, hideModal } from '../components/CustomModal';
import { users_url, profiles_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';


const ProfileEditScreen = props => {
  const { navigation } = props;
  const { updateUser, updateProfile, user, communities, logout } = useContext(AuthContext);

  const placeholderImage = user.profile.profile_pic;

  const isAndroid = Platform.OS === 'android' ? true : false;
  const homeCommunity = communities.find(community => community.id === user.profile.home);
  const availableCommunities = communities.filter(community => user.profile.member_of.includes(community.id));

  const [formValue, setFormValue] = useState({
    email: user.user.email,
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    profile_text: user.profile.profile_text,
  });

  const [selectedCommunity, setSelectedCommunity] = useState(homeCommunity || communities[0]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const profileTextRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => attemptDeleteProfile() }
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const updateForm = (text, input) => {
    setFormValue({ ...formValue, [input]: text });
  };

  const attemptDeleteProfile = () => {
    setIsDialogVisible(true);
  };

  const handleDeleteProfile = async () => {
    const url = users_url + user.user.id + '/';

    fetch(url, {
      method: 'DELETE',
    }).then(response => {
      console.log('Server response to account deletion: ', response.status);
    }).finally(() => {
      setIsDialogVisible(false);
      notifyMessage('Account Sucessfully Deleted!');
      logout();
    });
  };

  const attemptProfileUpdate = () => {
    handleProfileUpdate();
  };

  const handleProfileUpdate = async () => {
    if (!isProcessing) {
      setIsProcessing(true);
      showModal('UPDATING_PROFILE');

      const userPatchUrl = users_url + user.user.id + '/';
      const profilePatchUrl = profiles_url + user.profile.id + '/';

      let updatedUserData = user;
      updatedUserData.user.first_name = formValue.first_name;
      updatedUserData.user.last_name = formValue.last_name;
      updatedUserData.user.email = formValue.email;

      await sendUpdateUserRequest(JSON.stringify(updatedUserData.user), userPatchUrl, 'PATCH');
      await sendUpdateProfileRequest(profilePatchUrl, 'PATCH');

    } else {
      console.log('Processing your request, please wait');
    }
  };

  const createFormData = () => {
    const data = new FormData();
    if (selectedImage) {
      data.append('profile_pic', selectedImage);
    }

    data.append('profile_text', formValue.profile_text);
    if (selectedCommunity) {
      data.append('home', selectedCommunity.id);
    }

    return data;
  };

  const sendUpdateProfileRequest = (url, method) => {
    // console.log("In update profile Request, Outgoing url: " + url);

    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      body: createFormData(),
    })

      .then(response => response.json())
      .then(json => {
        // console.log(json);
        updateProfile(json);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsProcessing(false);
        hideModal();
        navigation.goBack();
        notifyMessage('Profile Sucessfully Updated!');
      });
  };

  const sendUpdateUserRequest = (payload, url, method) => {
    return fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: payload,
    })
      .then(response => response.json())
      .then(json => {
        updateUser(json);
      })
      .catch(error => {
        console.log(error.message)
      })
      .finally(() => {
      });
  };

  const renderCommunityPickerItems = () => {
    return availableCommunities.map(community =>
      <Picker.Item label={community.name} value={community} key={community.id}/>
    );
  }

  const showiOSActionSheet = () => {
    const options = communities.map(community => community.name);

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Home Community',
        options: ['Cancel', ...options],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          console.log(communities[buttonIndex-1].name);
          setSelectedCommunity(communities[buttonIndex - 1]);
        } else if (buttonIndex === 2) {
          console.log(communities[buttonIndex-1].name);
          setSelectedCommunity(communities[buttonIndex - 1]);
        } else if (buttonIndex === 3) {
          console.log(communities[buttonIndex-1].name);
          setSelectedCommunity(communities[buttonIndex - 1]);
        }
      }
    );
  };

  const renderHomeCommunityPicker = () => {
    if (isAndroid) {
      return(
        <View style={{ alignItems: 'center'}}>
          <Text style={styles.labelText}>Home Community</Text>
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
      return(
        <View style={{...styles.inputView, flexDirection: 'column', height: 80, paddingVertical: 10}}>
          <Button
            onPress={showiOSActionSheet}
            title='Choose Home Community'
          />
          <Text style={styles.text}>{selectedCommunity.name}</Text>
        </View>
      );
    }

  };

  const clearInputs = () => {
    setFormValue({});

    firstNameRef.current.clear();
    lastNameRef.current.clear();
    profileTextRef.current.clear();
  };


  const getImage = () => {
    return selectedImage;
  };

  const selectImage = imageData => {
    setSelectedImage(imageData);
  };

  const onKeyPress = (key) => {
    if (key === 'Enter') {
      descriptionInputRef.current.blur();
    }
  }

  const renderDeleteDialog = () => {
    return(
      <Dialog
        visible={isDialogVisible}
        onTouchOutside={() => setIsDialogVisible(false)}
        dialogTitle={<DialogTitle title="Are you sure you want to Delete your account and all associated postings? This is permanent!"/>}
        width={windowWidth * 0.75}
        footer={
          <DialogFooter>
            <DialogButton
              text='No'
              onPress={() => setIsDialogVisible(false)}
            />
            <DialogButton
              text='Yes'
              onPress={() => handleDeleteProfile()}
            />
          </DialogFooter>
        }
      >
        {null}
      </Dialog>
    )
  };

  return(
    <KeyboardShift>
      {() => (
        <ScrollView style={{ showsVerticalScrollIndicator: false}}>
          <View style={{marginHorizontal: 20}}>
            <View style={styles.imageContainer}>
              <CustomImagePicker
                iconName='images'
                onSelectImage={selectImage}
                getImage={getImage}
                setImage={setSelectedImage}

                placeholderImage={user.profile.profile_pic}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `First Name: ${user.user.first_name}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                blurOnSubmit={false}
                onChangeText={text => updateForm(text, 'first_name')}
                onSubmitEditing={() => lastNameRef.current.focus()}
                ref={firstNameRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `Last Name: ${user.user.last_name}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={35}
                returnKeyType='next'
                blurOnSubmit={false}
                onChangeText={text => updateForm(text, 'last_name')}
                onSubmitEditing={() => emailRef.current.focus()}
                ref={lastNameRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `email: ${user.user.email}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={50}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                blurOnSubmit={false}
                onChangeText={text => updateForm(text, 'email')}
                onSubmitEditing={() => profileTextRef.current.focus()}
                ref={emailRef}
              />
            </View>
            <View style={{ ...styles.inputView, ...styles.profileInputView}}>
              <TextInput
                style={styles.inputText}
                placeholder={ `Profile Text: ${user.profile.profile_text}` }
                placeholderTextColor={Colors.placeholder_text}
                blurOnSubmit={true}
                maxLength={255}
                multiline={true}
                returnKeyType='done'
                onKeyPress={nativeEvent => onKeyPress(nativeEvent.key)}
                onChangeText={text => updateForm(text, 'profile_text')}
                ref={profileTextRef}
              />
            </View>
            { renderHomeCommunityPicker() }
            <CustomButton
              onPress={attemptProfileUpdate}
              style={{ marginBottom: 10, alignSelf: 'center'}}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </CustomButton>
          </View>
          {renderDeleteDialog()}
        </ScrollView>
      )}
    </KeyboardShift>

  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  screenTitle: {
    color: Colors.dark_shade1,
    fontFamily: 'open-sans-bold',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
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
    marginBottom: 10,
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
  profileInputView: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  inputText: {
    width: '90%',
    color: Colors.dark_shade1,
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  },
  communityPickerContainer: {
    width: '80%',
  },
  communityPicker: {
    height: 50,
    width: '80%',
  },
  text: {
    fontSize: 20,
    paddingBottom: 10,
  },
  labelText: {
    textAlign: 'center',
    paddingBottom: 5,
    fontFamily: 'open-sans',
    fontSize: 12,

  },
  headerButton: {
    marginRight: 15,
  },
  deleteButtonText: {
    color: Colors.contrast3,
    fontSize: 18,
  },
});

export default ProfileEditScreen;

