import React, { useState, useContext } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet,
         Image,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const RegisterScreen = props => {
  const { navigation, route } = props;
  const { register } = useContext(AuthContext);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  return(
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
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={text => setEmailText(text)}
          />
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
            onChangeText={text => setEmailText(text)}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign
            name={'lock'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Password...'
            placeholderTextColor={Colors.placeholder_text}
            secureTextEntry
            onChangeText={text => setPasswordText(text)}
          />
        </View>
        <View style={styles.inputView}>
          <AntDesign
            name={'lock'}
            size={20}
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder='Confirm Password...'
            placeholderTextColor={Colors.placeholder_text}
            secureTextEntry
    /* onChangeText={text => setPasswordText(text)} */
          />
        </View>
      </View>

      <CustomButton
        style={styles.registerButton}
        onPress={() => {
          const userData = { userName: emailText, password: passwordText };
          register(userData);
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
    backgroundColor: Colors.secondary,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: '10%',
  },
});


export default RegisterScreen;
