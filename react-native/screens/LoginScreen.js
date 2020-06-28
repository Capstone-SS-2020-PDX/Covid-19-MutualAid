import React, { useState, useContext } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         Image,
         StyleSheet,
         TouchableOpacity
       } from 'react-native';

import { useInputState } from '../hooks/useInputState';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const LoginScreen = props => {
  const { navigation, route } = props;
  const { login } = useContext(AuthContext);
  // const [value, handleChange, reset] = useInputState("");
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  return(
    <View style={styles.screen}>
      <View style={ styles.imageContainer }>
        <Image
          style={ styles.image }
          resizeMode='contain'
          source={ require('../assets/CommonGoods-Title.png') }
          fadeDuration={ 300 }
        />
      </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email...'
            placeholderTextColor={Colors.placeholder_text}
            onChangeText={text => setEmailText(text)}
          />
        </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password...'
          placeholderTextColor={Colors.placeholder_text}
          secureTextEntry
          onChangeText={text => setPasswordText(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton
        style={styles.loginButton}
        onPress={() => {
          const userData = { userName: emailText, password: passwordText };
          login(userData);
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
    backgroundColor: Colors.light_shade4,
    borderRadius: 25,
    borderColor: Colors.placeholder_text,
    borderWidth: 0.5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
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
    marginBottom: windowHeight / 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputText: {
    height: 50,
    color: Colors.dark_shade1,
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
    backgroundColor: Colors.secondary,
    marginTop: 20,
    marginBottom: 20,
  },
});


export default LoginScreen;
