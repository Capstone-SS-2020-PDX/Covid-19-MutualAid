import React, { useContext, useState, useRef } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Picker,
    ActionSheetIOS,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from 'react-native';

import CustomImagePicker from '../components/CustomImagePicker';
import CustomButton from '../components/CustomButton';

import Colors from '../config/colors';
import { showModal, hideModal } from '../components/CustomModal';
import { windowHeight, windowWidth } from '../config/dimensions';
import { users_url, profiles_url } from '../config/urls';

import { AuthContext } from '../providers/AuthProvider';

const ProfileEditScreen = props => {
    const { navigation } = props;
    const { addProfile, updateUser, updateProfile, user, communities } = useContext(AuthContext);

    const placeholderImage = user.profile.profile_pic;

    const isAndroid = Platform.OS === 'android' ? true : false;
    const homeCommunity = communities.find(community => community.id === user.profile.home);

    const [formValue, setFormValue] = useState({
        username: user.user.username,
        email: user.user.email,
        first_name: user.user.first_name,
        last_name: user.user.last_name,
        profile_text: user.profile.profile_text,
    });
    const [selectedCommunity, setSelectedCommunity] = useState(homeCommunity);
    const [selectedImage, setSelectedImage] = useState(placeholderImage ? {uri: placeholderImage} : null);
    const [isProcessing, setIsProcessing] = useState(false);

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const profileTextRef = useRef(null);

    const updateForm = (text, input) => {
        setFormValue({ ...formValue, [input]: text });
    };

    const attemptProfileUpdate = () => {
        if (!selectedImage || !formValue) {
            showModal('VALIDATION_ERROR');
            setTimeout(() => {
                hideModal();
            }, 900);
        } else {
            handleProfileUpdate();
        }
    };

    const handleProfileUpdate = () => {
        if (!isProcessing) {
            setIsProcessing(true);

            const userUrl = users_url + user.id + '/';
            const profileUrl = profiles_url + user.profile + '/';

            let userData = user;
            userData.first_name = formValue.first_name;
            userData.last_name = formValue.last_name;
            sendRequest(JSON.stringify(userData), userUrl);

            let profileData = { user: user.id, profile_text: formValue.profile_text }
            sendRequest(JSON.stringify(profileData), profileUrl);

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
        data.append('home', selectedCommunity.id);
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
            .then(response => response.json())
            .then(json => {
                // console.log("In update profile Request: ");
                // console.log(json);
                updateProfile(json);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                // fetchProfile();
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
                updateUser(json);
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
            });
    };

    const getImage = () => {
        return selectedImage;
    };

    const selectImage = imageData => {
        // console.log("In selectImage: " + JSON.stringify(imageData));
        setSelectedImage(imageData);
    };

    const renderCommunityPickerItems = () => {
        return communities.map(community =>
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
                <View>
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

    return(
        <ScrollView contentContainerStyle={styles.screen}>

          <View style={styles.imageContainer}>
            <CustomImagePicker
              iconName='images'
              onSelectImage={selectImage}
              getImage={getImage}
              setImage={setSelectedImage}
              placeholder={user.profile.profile_pic}
            />
          </View>

          <KeyboardAvoidingView style={styles.inputContainer} behavior='padding'>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `First Name: ${formValue.first_name}` }
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
                placeholder={ `Last Name: ${formValue.last_name}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'last_name')}
                ref={lastNameRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `User Name: ${formValue.username}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'username')}
                ref={firstNameRef}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder={ `email: ${formValue.email}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'email')}
                ref={firstNameRef}
              />
            </View>
            <View style={{ ...styles.inputView, ...styles.profileInputView}}>
              <TextInput
                style={styles.inputText}
                placeholder={ `Profile Text: ${formValue.profile_text}` }
                placeholderTextColor={Colors.placeholder_text}
                maxLength={255}
                multiline={true}
                returnKeyType='go'
                onChangeText={text => updateForm(text, 'profile_text')}
                ref={profileTextRef}
              />
            </View>
          </KeyboardAvoidingView>
          { renderHomeCommunityPicker() }
          <CustomButton
            onPress={attemptProfileUpdate}
            style={{ marginBottom: 10, alignSelf: 'center'}}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </CustomButton>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
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
});

export default ProfileEditScreen;

