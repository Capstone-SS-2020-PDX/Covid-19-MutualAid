import React, { useRef, useState, useContext } from 'react';
import { View,
         Text,
         TextInput,
         Image,
         StyleSheet,
         TouchableOpacity,
       } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import KeyboardShift from 'react-native-keyboardshift-razzium';
import { Formik } from "formik";
import * as Yup from "yup";

import { showModal, hideModal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';
import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const LoginScreen = props => {
  const { navigation, route } = props;
  const { login } = useContext(AuthContext);

  const passwordInputRef = useRef(null);

  const attemptLogin = values => {
    showModal('LOADING');
    setTimeout(() => {
      hideModal();
    }, 900);

    const loginData = { username: values.username, password: values.password };
    login(loginData);
  };

  const errorIcon = () => (
    <FontAwesome
      name={'exclamation-circle'}
      size={20}
      color={Colors.contrast3}
      style={styles.icon}
    />
  );

  const loginForm = () => (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => {
        attemptLogin(values);
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().min(4, 'too short!').required('username is required'),
        password: Yup.string().min(4, 'too short!').required('password is required'),
      })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <View style={styles.inputContainer}>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.username && touched.username ? errors.username : ''}</Text>
            </View>
            <View style={styles.inputView}>
              <AntDesign
                name={'user'}
                size={20}
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                placeholder='User Name...'
                placeholderTextColor={Colors.placeholder_text}
                autoCapitalize='none'
                autoCorrect={false}
                returnKeyType='next'
                blurOnSubmit={false}
                value={values.username}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')}
                onSubmitEditing={() => passwordInputRef.current.focus()}
              />
              { errors.username && touched.username ? errorIcon() : null }
            </View>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errors.password && touched.password ? errors.password : ''}</Text>
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
                returnKeyType='done'
                secureTextEntry
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
              />
              { errors.password && touched.password ? errorIcon() : null }
            </View>
          </View>
          {/* <TouchableOpacity> */}
          {/*   <Text style={styles.forgotPasswordText}>Forgot Password?</Text> */}
          {/* </TouchableOpacity> */}

          <CustomButton
            style={styles.loginButton}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </CustomButton>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </>
      )}
    </Formik>
  );

  return(
    <KeyboardShift>
      {() => (
        <View style={styles.screen}>
          <View style={ styles.imageContainer }>
            <Image
              style={ styles.image }
              resizeMode='contain'
              source={ require('../assets/CommonGoods-Title.png') }
              fadeDuration={ 300 }
            />
          </View>
          { loginForm() }
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
  imageContainer: {
    // Dimesions.get as an example of responsive styling
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    marginBottom: windowHeight / 25,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputText: {
    width: '80%',
    height: 50,
    color: Colors.dark_shade1,
  },
  icon: {
    width: '10%',
  },
  forgotPasswordText: {
    color: Colors.contrast2,
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
  loginButton: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginBottom: 20,
  },
  errorContainer: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },
  errorText: {
    fontSize: 10,
    color: Colors.contrast3,
  },
});


export default LoginScreen;
