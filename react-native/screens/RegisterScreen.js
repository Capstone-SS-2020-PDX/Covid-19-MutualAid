import React, { useState, useContext, useRef, useEffect } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet,
         Image,
         Platform,
         ActivityIndicator,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WModal } from 'react-native-smart-tip';

import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import * as Location from 'expo-location';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { showModal, hideModal } from '../components/CustomModal';

const RegisterScreen = props => {
  const { navigation, route } = props;
  const { register, isLoading, setIsLoading, checkUsername } = useContext(AuthContext);
  const [ errorMsg, setErrorMsg] = useState(null);
  const [emailText, setEmailText] = useState(null)
  const [userNameText, setUserNameText] = useState(null);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [passwordText, setPasswordText] = useState(null);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  const [ location, setLocation] = useState(null);
  
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
  });

  const attemptRegister = () =>{
    if (!emailText || !userNameText || !passwordText) {
      showModal('VALIDATION_ERROR');
      setTimeout(() => {
        hideModal();
      }, 900);

    } else if (isValidUsername === false) {
      showModal('INVALID_USERNAME');
      setTimeout(() => {
        hideModal();
      }, 900);

    } else {
      showModal('LOADING');
      setTimeout(() => {
        hideModal();
      }, 900);
      console.log(location);
      let point = 'POINT(' + location.coords.latitude + ' ' + location.coords.longitude + ')';
      console.log(point);
      const userData = { username: userNameText, password: passwordText, email: emailText, point: point };
      register(userData);
    }
  };

  return(
    <KeyboardShift>
      {() => (
    <View style={styles.screen}>
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <AntDesign
            name={'mail'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Email...'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            blurOnSubmit={false}
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={text => setEmailText(text)}
            onSubmitEditing={() => usernameInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign
            name={'user'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            ref={usernameInputRef}
            style={styles.inputText}
            placeholder='User Name...'
            autoCapitalize='none'
            placeholderTextColor={Colors.placeholder_text}
            returnKeyType='next'
            onBlur={() => {
              setIsValidUsername(checkUsername(userNameText));
            }}
            blurOnSubmit={false}
            onChangeText={text => setUserNameText(text)}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign
            name={'lock'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            ref={passwordInputRef}
            style={styles.inputText}
            placeholder='Password...'
            placeholderTextColor={Colors.placeholder_text}
            secureTextEntry
            returnKeyType='next'
            blurOnSubmit={false}
            onChangeText={text => setPasswordText(text)}
            onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign
            name={'lock'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            ref={confirmPasswordInputRef}
            style={styles.inputText}
            placeholder='Confirm Password...'
            returnKeyType='done'
            placeholderTextColor={Colors.placeholder_text}
            secureTextEntry
    /* onChangeText={text => setPasswordText(text)} */
            onSubmitEditing={() => attemptRegister()}
          />
        </View>
      </View>

      <CustomButton
        style={styles.registerButton}
        onPress={() => {
          attemptRegister();
        }}
      >
        <Text style={styles.loginText}>Sign Up</Text>
      </CustomButton>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        <Text style={styles.registerText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
      )}
      </KeyboardShift>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light_shade4,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: 50,
    color: Colors.dark_shade1,
  },
  logo: {
    fontFamily: 'open-sans-bold',
    fontSize: 70,
    color: Colors.primary,
    marginBottom: 40,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: Colors.contrast3,
    fontSize: 15,
  },
  loginText: {
    color: 'white',
    fontSize: 24,
  },
  registerText: {
    color: Colors.contrast2,
    fontSize: 20,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: '10%',
  },
});


export default RegisterScreen;
