import React, { useContext, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';

import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';

import Colors from '../config/colors';
import { showModal, hideModal } from '../components/CustomModal';
import { windowHeight, windowWidth } from '../config/dimensions';
import { users_url, profiles_url } from '../config/urls';

const ProfileCreationScreen = props => {
    const { navigation } = props;
    const { addProfile, updateUser, updateProfile, user } = useContext(AuthContext);

    const [formValue, setFormValue] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const profileTextRef = useRef(null);

    const updateForm = (text, input) => {
        setFormValue({ ...formValue, [input]: text });
    };

    const attemptProfileCreation = () => {
        if (!selectedImage || !formValue) {
            showModal('VALIDATION_ERROR');
            setTimeout(() => {
                hideModal();
            }, 900);
        } else {
            handleProfileCreation();
        }
    };

    const handleProfileCreation = () => {
        if (!isProcessing) {
            setIsProcessing(true);
            showModal('CREATING_PROFILE');

            const userPatchUrl = users_url + user.user.id + '/';
            const profilePatchUrl = profiles_url + user.profile.id + '/';

            let updatedUserData = user;
            updatedUserData.user.first_name = formValue.first_name;
            updatedUserData.user.last_name = formValue.last_name;

            sendUpdateUserRequest(JSON.stringify(updatedUserData.user), userPatchUrl, 'PATCH');
            sendUpdateProfileRequest(profilePatchUrl, 'PATCH');
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
        return data;
    };

    const sendUpdateProfileRequest = (url, method) => {
        return fetch(url, {
            method: method,
            headers: {
                'Content-type': 'multipart/form-data',
            },
            body: createFormData(),
        })
            .then(response => response.text())
            .then(json => {
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                fetchProfile();
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
                console.log(error)
            })
            .finally(() => {
            });
    };

    const fetchProfile = () => {
        const url = profiles_url + user.profile.id + '/';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => {
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
        console.log("In selectImage: " + JSON.stringify(imageData));
        setSelectedImage(imageData);
    };

    return(
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

          <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='First Name...'
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'first_name')}
                ref={firstNameRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='Last Name...'
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'last_name')}
                ref={lastNameRef}
              />
            </View>
            <View style={{ ...styles.inputView, ...styles.profileInputView}}>
              <TextInput
                style={styles.inputText}
                placeholder='Profile Text...'
                placeholderTextColor={Colors.placeholder_text}
                maxLength={255}
                multiline={true}
                returnKeyType='go'
                onChangeText={text => updateForm(text, 'profile_text')}
                ref={profileTextRef}
              />
            </View>
          </KeyboardAvoidingView>
          <CustomButton
            onPress={attemptProfileCreation}
            style={{ marginBottom: 10, alignSelf: 'center'}}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </CustomButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
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
});

export default ProfileCreationScreen;
