import React, { useContext, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { UserContext } from '../providers/UserProvider';
import CustomButton from '../components/CustomButton';
import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import CustomImagePicker from '../components/CustomImagePicker';

const ProfileCreationScreen = props => {
    const { user } = useContext(UserContext);
    const { navigation } = props;
    const [selectedImage, setSelectedImage] = useState(null);

    const [formValue, setFormValue] = useState({});

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const profileTextRef = useRef(null);

    const updateForm = (text, input) => {
        setFormValue({ ...formValue, [input]: text });
    };

    const getImage = () => {
      return selectedImage
    };

    const handleProfileCreation = () => {
        // console.log(formValue);

        // let userData = user;
        // userData.first_name = formValue.first_name;
        // userData.last_name = formValue.last_name;
        // userData.Profile = {profile_text: formValue.profile_text};
        // console.log("user Data: " + JSON.stringify(userData));

        let profileData = { user: user.id, profile_text: formValue.profile_text, profile_pic: selectedImage}
        sendRequest(JSON.stringify(profileData));
    };

    const sendRequest = payload => {
        const url = "https:cellular-virtue-277000.uc.r.appspot.com/profiles/1/";
        console.log(payload);

        return fetch(url, {
            method: 'PUT',
            headers: {
                // 'content-type': 'multipart/form-data',
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: payload,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
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
          <View style={styles.inputContainer}>
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
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder='Email...'
                placeholderTextColor={Colors.placeholder_text}
                maxLength={25}
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'email')}
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
                returnKeyType='next'
                onChangeText={text => updateForm(text, 'profile_text')}
                ref={profileTextRef}
              />
            </View>
          </View>
          <CustomButton
            onPress={handleProfileCreation}
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
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
        fontSize: 36,
        textAlign: 'center',
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
