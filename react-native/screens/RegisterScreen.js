import React, { useState, useContext } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         TouchableOpacity,
         StyleSheet,
         Image,
         Dimensions,
       } from 'react-native';

import Center from '../components/Center';
import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';

const RegisterScreen = props => {
  const { navigation, route } = props;
  const { register } = useContext(AuthContext);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  return(
    <View style={styles.screen}>
      <Text style={styles.logo}>Register</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Email...'
          placeholderTextColor={Colors.dark_shade1}
          onChangeText={text => setEmailText(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password...'
          placeholderTextColor='#003f5c'
          secureTextEntry
          onChangeText={text => setPasswordText(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Confirm Password...'
          placeholderTextColor='#003f5c'
          secureTextEntry
    /* onChangeText={text => setPasswordText(text)} */
        />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => {
          const userData = { userName: emailText, password: passwordText };
          register(userData);
        }}
      >
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>

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
  inputView: {
    width: '80%',
    backgroundColor: Colors.light_shade1,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
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
    width: '80%',
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});


export default RegisterScreen;
