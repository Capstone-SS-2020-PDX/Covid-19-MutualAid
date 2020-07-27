import React, { useState, useContext, useRef } from 'react';
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
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { WModal } from 'react-native-smart-tip';
import { Formik } from "formik";
import * as Yup from "yup";

import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';
import KeyboardShift from 'react-native-keyboardshift-razzium';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { showModal, hideModal } from '../components/CustomModal';

const RegisterScreen = props => {
  const { navigation, route } = props;
  const { register, isLoading, setIsLoading, checkUsername } = useContext(AuthContext);

  const [isValidUsername, setIsValidUsername] = useState(true);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const attemptRegister = values => {
    showModal('LOADING');
    setTimeout(() => {
      hideModal();
    }, 900);

    const userData = { username: values.username, password: values.password, email: values.email };
    register(userData);
  };

  const errorIcon = () => (
    <FontAwesome
      name={'exclamation-circle'}
      size={20}
      color={Colors.contrast3}
      style={styles.icon}
    />
  );

  const updateIsValidUsername = async value => {
    const isValid = await checkUsername(value);
    setIsValidUsername(isValid);
  };

  const registerForm = () => (
    <Formik
      initialValues={{ email: '', username: '', password: '' }}
      onSubmit={values => {
        attemptRegister(values);
        console.log(values);
      }}
    validationSchema={Yup.object().shape({
      email: Yup.string().email('Invalid email').required('email required'),
      username: Yup.string().min(4, 'Too short!').max(30, 'Too long!')
                   .test('username-available', 'username not available', () => {
                     console.log("Is usernameValid? " + isValidUsername);
                     return isValidUsername;
                   })
                   .required('username required'),
      password: Yup.string().min(4, 'Too short!').max(30, 'Too long!')
                   .required('password required'),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ).required('confirm your password'),
    })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
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
                value={values.email}
                onChangeText={handleChange('email')}
                onSubmitEditing={() => usernameInputRef.current.focus()}
              />
              { errors.email && touched.email ? errorIcon() : null }
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
                  updateIsValidUsername(values.username);
                }}
                blurOnSubmit={false}
                value={values.username}
                onChangeText={handleChange('username')}
                onSubmitEditing={() => passwordInputRef.current.focus()}
              />
              { errors.username && touched.username ? errorIcon() : null }
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
                value={values.password}
                onChangeText={handleChange('password')}
                onSubmitEditing={() => confirmPasswordInputRef.current.focus()}
              />
              { errors.password && touched.password ? errorIcon() : null }
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
                value={values.confirm_password}
                onChangeText={handleChange('confirm_password')}
              />
              { errors.confirm_password && touched.confirm_password ? errorIcon() : null }
            </View>
          </View>
          <CustomButton
            style={styles.registerButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </CustomButton>
        </>
      )}
    </Formik>
  );

  return(
    <KeyboardShift>
      {() => (
        <View style={styles.screen}>
          <Text style={styles.logo}>Register</Text>

          { registerForm() }

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
    alignItems: 'center',
    width: '100%',
    height: 50,

    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
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
    width: '80%',
    height: 50,
    color: Colors.dark_shade1,
  },
  icon: {
    width: '10%',
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
});


export default RegisterScreen;
