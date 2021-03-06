import React, { useContext, useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Picker,
    TouchableOpacity,
    ActionSheetIOS,
    Platform,
    StyleSheet,
} from 'react-native';
import { AntDesign, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import { Formik } from "formik";
import * as Yup from "yup";
import * as Location from 'expo-location';

import { AuthContext } from '../providers/AuthProvider';

import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';
import CommunityPicker from '../components/CommunityPicker';
import Colors from '../config/colors';

import { showModal, hideModal } from '../components/CustomModal';
import { windowHeight, windowWidth } from '../config/dimensions';
import { users_url, profiles_url } from '../config/urls';

const isAndroid = Platform.OS === 'android' ? true : false;

const ProfileCreationScreen = props => {
    const { navigation } = props;
    const { addProfile, updateUser, updateProfile, user, communities } = useContext(AuthContext);

    const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [location, setLocation] = useState(null);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const profileTextRef = useRef(null);

    const errorIcon = () => (
        <FontAwesome
          name={'exclamation-circle'}
          size={20}
          color={Colors.contrast3}
          style={styles.icon}
        />
    );

    const attemptProfileCreation = values => {
        handleProfileCreation(values)
    };


    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          } 
            let location = await Location.getCurrentPositionAsync({accuracy: 5})
            setLocation(location);
          }
        )()
      }, []);

    const handleProfileCreation = values => {
        if (!isProcessing) {
            setIsProcessing(true);
            showModal('CREATING_PROFILE');

            const userPatchUrl = users_url + user.user.id + '/';
            const profilePatchUrl = profiles_url + user.profile.id + '/';

            let updatedUserData = user;
            updatedUserData.user.first_name = values.first_name;
            updatedUserData.user.last_name = values.last_name;

            sendUpdateUserRequest(JSON.stringify(updatedUserData.user), userPatchUrl, 'PATCH');
            sendUpdateProfileRequest(profilePatchUrl, 'PATCH', values);
        } else {
            console.log('Processing your request, please wait');
        }
    };

    const createFormData = values => {
        const data = new FormData();

        if (selectedImage) {
            data.append('profile_pic', selectedImage);
        }
        data.append('profile_text', values.profile_text || 'This is my profile');
        data.append('home', selectedCommunity.id);
        data.append('member_of', selectedCommunity.id);
      
        let home_location = 'POINT(' + location.coords.longitude + ' ' + location.coords.latitude + ')';
        console.log(home_location);
      
        data.append('home_location', home_location);

        return data;
    };

    const sendUpdateProfileRequest = (url, method, values) => {
        return fetch(url, {
            method: method,
            headers: {
                'Content-type': 'multipart/form-data',
            },
            body: createFormData(values),
        })
            .then(response => response.json())
            .then(json => {
                console.log("In update profile Request: ");
                console.log(json);
                updateProfile(json);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setIsProcessing(false);
                hideModal();
                addProfile();
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
                console.log("In update user Request: ");
                console.log(json);
                updateUser(json);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
            });
    };

    const clearInputs = () => {
        setFormValue({});

        firstNameRef.current.clear();
        lastNameRef.current.clear();
        profileTextRef.current.clear();
        setSelectedImage(null);
    };

    const getImage = () => {
        return selectedImage;
    };

    const selectImage = imageData => {
        setSelectedImage(imageData);
    };

    const renderHomeCommunityPicker = () => {
      return(
        <>
          <View style={styles.legendContainer}>
            <Text style={styles.labelText}>Choose Home Community</Text>
          </View>
          <CommunityPicker
            defaultItem={selectedCommunity}
            items={communities}
            selectedItem={selectedItem}
          />
        </>
      )
    };

  const selectedItem = community => {
    setSelectedCommunity(community);
  };

  const onKeyPress = (key) => {
    if (key === 'Enter') {
      descriptionInputRef.current.blur();
    }
  }

  const form = () => (
    <Formik
      initialValues={{ first_name: '', last_name: '', profile_text: '' }}
      onSubmit={values => {
        attemptProfileCreation(values);
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().min(2, 'must be at least 2 letters').required('first name is required') ,
        last_name: Yup.string().min(2, 'must be at least 2 letters').required('last name is required'),
        profile_text: Yup.string().notRequired(),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.inputContainer} behavior='padding'>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.first_name && touched.first_name ? errors.first_name : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <FontAwesome5
                name={'id-badge'}
                size={20}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder='First Name...'
                placeholderTextColor={Colors.placeholder_text}
                blurOnSubmit={false}
                maxLength={25}
                returnKeyType='next'
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                onChangeText={handleChange('first_name')}
                onSubmitEditing={() => lastNameRef.current.focus()}
                ref={firstNameRef}
              />
              { errors.first_name && touched.first_name ? errorIcon() : null }
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.last_name && touched.last_name ? errors.last_name : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <FontAwesome5
                name={'id-badge'}
                size={20}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder='Last Name...'
                placeholderTextColor={Colors.placeholder_text}
                blurOnSubmit={false}
                maxLength={25}
                returnKeyType='next'
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                onChangeText={handleChange('last_name')}
                onSubmitEditing={() => profileTextRef.current.focus()}
                ref={lastNameRef}
              />
              { errors.last_name && touched.last_name ? errorIcon() : null }
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.profile_text && touched.profile_text ? errors.profile_text : ''}</Text>
            </View>
            <View style={{ ...styles.inputView, ...styles.profileInputView}}>
              <Entypo
                name={'text-document'}
                size={20}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder='Profile Text...'
                placeholderTextColor={Colors.placeholder_text}
                blurOnSubmit={true}
                maxLength={255}
                blurOnSubmit={true}
                multiline={true}
                returnKeyType='done'
                onBlur={handleBlur('profile_text')}
                value={values.profile_text}
                onKeyPress={nativeEvent => onKeyPress(nativeEvent.key)}
                onChangeText={handleChange('profile_text')}
                ref={profileTextRef}
              />
            </View>
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
        <View style={styles.screen}>
          <Text style={styles.screenTitle}>Create Your Profile</Text>

          <View style={styles.imageContainer}>
            <CustomImagePicker
              iconName='images'
              onSelectImage={selectImage}
              getImage={getImage}
              setImage={setSelectedImage}
            />
          </View>
          { form() }
        </View>
      )}
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
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
    width: '100%',
    height: 50,

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
    width: '80%',
    color: Colors.dark_shade1,
  },
  icon: {
    width: '10%',
  },
  buttonText: {
    color: Colors.light_shade1,
    fontSize: 24,
  },
  communityPickerContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.dark_shade1,
  },
  iosPicker: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 100,
    marginBottom: 10,
    paddingHorizontal: 20,

  },
  communityPickerContainer: {
    width: '80%',
  },
  communityPicker: {
    height: isAndroid ? 50 : 200,
    width: '80%',
  },
  errorContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },
  errorText: {
    fontSize: 10,
    color: Colors.contrast3,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default ProfileCreationScreen;
