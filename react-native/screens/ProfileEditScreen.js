import React, { useContext, useLayoutEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Picker,
  Button,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

import { AntDesign, FontAwesome } from '@expo/vector-icons';
import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import { Formik } from "formik";
import * as Yup from "yup";
import Dialog, { DialogContent, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog';

import CommunityPicker from '../components/CommunityPicker';
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

  const [selectedCommunity, setSelectedCommunity] = useState(homeCommunity);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const profileTextRef = useRef(null);

  const errorIcon = () => (
    <FontAwesome
      name={'exclamation-circle'}
      size={20}
      color={Colors.contrast3}
      style={styles.icon}
    />
  );

  const attemptProfileUpdate = values => {
    handleProfileUpdate(values)
  };

  
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

  const handleProfileUpdate = async values => {
    if (!isProcessing) {
      setIsProcessing(true);
      showModal('UPDATING_PROFILE');

      const userPatchUrl = users_url + user.user.id + '/';
      const profilePatchUrl = profiles_url + user.profile.id + '/';

      let updatedUserData = user;
      updatedUserData.user.first_name = values.first_name;
      updatedUserData.user.last_name = values.last_name;
      updatedUserData.user.email = values.email;

      await sendUpdateUserRequest(JSON.stringify(updatedUserData.user), userPatchUrl, 'PATCH');
      await sendUpdateProfileRequest(profilePatchUrl, 'PATCH', values);

    } else {
      console.log('Processing your request, please wait');
    }
  };

  const createFormData = values => {
    const data = new FormData();
    if (selectedImage) {
      data.append('profile_pic', selectedImage);
    }

    data.append('profile_text', values.profile_text);
    if (selectedCommunity) {
      data.append('home', selectedCommunity.id);
    }

    return data;
  };

  const sendUpdateProfileRequest = (url, method, values) => {
    // console.log("In update profile Request, Outgoing url: " + url);

    return fetch(url, {
      method: method,
      headers: {
        'Content-type': 'multipart/form-data',
      },
      body: createFormData(values),
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

  const renderHomeCommunityPicker = () => {
    // if (isAndroid) {
    //   return(
    //     <View style={{ alignItems: 'center'}}>
    //       <Text style={styles.labelText}>Home Community</Text>
    //       <View style={{...styles.inputView, ...styles.communityPickerContainer}}>
    //         <Picker
    //           style={styles.communityPicker}
    //           selectedValue={selectedCommunity}
    //           onValueChange={(itemValue, itemIndex) => setSelectedCommunity(itemValue)}
    //         >
    //           { renderCommunityPickerItems() }
    //         </Picker>
    //       </View>
    //     </View>
    //   );
    // }
    return(
      <>
        <View style={styles.legendContainer}>
          <Text style={styles.labelText}>Home Community</Text>
        </View>
        <CommunityPicker
          items={availableCommunities}
          selectedItem={selectedItem}
        />
      </>
    )
  };

  const selectedItem = community => {
    console.log('In Edit Screen');
    console.log(community);
    setSelectedCommunity(community);
  };

  const getImage = () => {
    return selectedImage;
  };

  const selectImage = imageData => {
    setSelectedImage(imageData);
  };


  const onKeyPress = key => {
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


  const form = () => (
    <Formik
      initialValues={{ first_name: user.user.first_name, last_name: user.user.last_name,
                       email: user.user.email, profile_text: user.profile.profile_text }}
      onSubmit={values => {
        attemptProfileUpdate(values);
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().min(4, 'must be at least 4 letters').required('first name is required'),
        last_name: Yup.string().min(4, 'must be at least 4 letters').required('last name is required'),
        email: Yup.string().email('invalid email').required('email address is required'),
        profile_text: Yup.string().min(2, 'must be at least 1 letter').required('profile text is required'),
      })}
    >

      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
            <View style={styles.legendContainer}>
              <Text style={styles.labelText}>First Name</Text>
              <Text style={styles.errorText}>{errors.first_name && touched.first_name ? errors.first_name : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                maxLength={25}
                returnKeyType='next'
                blurOnSubmit={false}
                value={values.first_name}
                onBlur={handleBlur('first_name')}
                onChangeText={handleChange('first_name')}
                onSubmitEditing={() => lastNameRef.current.focus()}
                ref={firstNameRef}
              />
              { errors.first_name && touched.first_name ? errorIcon() : null }
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.labelText}>Last Name</Text>
              <Text style={styles.errorText}>{errors.last_name && touched.last_name ? errors.last_name : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                maxLength={35}
                returnKeyType='next'
                blurOnSubmit={false}
                value={values.last_name}
                onBlur={handleBlur('last_name')}
                onChangeText={handleChange('last_name')}
                onSubmitEditing={() => emailRef.current.focus()}
                ref={lastNameRef}
              />
              { errors.last_name && touched.last_name ? errorIcon() : null }
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.labelText}>Email</Text>
              <Text style={styles.errorText}>{errors.email && touched.email ? errors.email : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                maxLength={50}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                blurOnSubmit={false}
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                onSubmitEditing={() => profileTextRef.current.focus()}
                ref={emailRef}
              />
              { errors.email && touched.email ? errorIcon() : null }
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.labelText}>Profile Text</Text>
              <Text style={styles.errorText}>{errors.profile_text && touched.profile_text ? errors.profile_text : ''}</Text>
            </View>
            <View style={{ ...styles.inputView, ...styles.profileInputView}}>
              <TextInput
                style={styles.inputText}
                blurOnSubmit={true}
                maxLength={255}
                multiline={true}
                returnKeyType='done'
                onKeyPress={nativeEvent => onKeyPress(nativeEvent.key)}
                value={values.profile_text}
                onBlur={handleBlur('profile_text')}
                onChangeText={handleChange('profile_text')}
                ref={profileTextRef}
              />
              { errors.profile_text && touched.profile_text ? errorIcon() : null }
            </View>
            { renderHomeCommunityPicker() }
            <CustomButton
              onPress={handleSubmit}
              style={{ marginBottom: 10, alignSelf: 'center'}}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </CustomButton>
        </>
      )}
    </Formik>
  );

  return(
    <KeyboardShift>
      {() => (
        <ScrollView style={{ showsVerticalScrollIndicator: false}}>
          <View style={styles.screen}>
            <View style={styles.imageContainer}>
              <CustomImagePicker
                iconName='images'
                onSelectImage={selectImage}
                getImage={getImage}
                setImage={setSelectedImage}

                placeholderImage={user.profile.profile_pic}
              />
            </View>
            { form() }
          </View>
          {renderDeleteDialog()}
        </ScrollView>
      )}
    </KeyboardShift>

  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light_shade4,
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
    alignItems: 'center',
    height: 50,
    width: '80%',

    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
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
    height: 80,
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
  icon: {
    width: '10%',
  },
  legendContainer: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark_shade1,
  },
  errorText: {
    fontSize: 10,
    color: Colors.contrast3,
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

