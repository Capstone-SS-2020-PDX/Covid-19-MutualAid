import React, { useState, useContext } from 'react';
import { View,
         KeyboardAvoidingView,
         Text,
         TextInput,
         Button,
         Image,
         StyleSheet,
         TouchableOpacity,
         ActivityIndicator,
       } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WModal } from 'react-native-smart-tip';

import { showModal, hideModal } from '../components/CustomModal';
import Center from '../components/Center';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const LoginScreen = props => {
  const { navigation, route } = props;
  const { login } = useContext(AuthContext);
  const { user, updateUser } = useContext(UserContext);
  // const [value, handleChange, reset] = useInputState("");

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  const [loginData, setLoginData] = useState({
    userName: '',
    password: '',
    isValidUser: true,
    isValidPassword: true,
  });

  const attemptLogin = () => {
    showModal();
    setTimeout(() => {
      hideModal();
    }, 600);
   
    const userData = { username: emailText, password: passwordText };
    login(userData);
  };

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
      <KeyboardAvoidingView behavior={'padding'} style={styles.inputContainer}>
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
      </KeyboardAvoidingView>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <CustomButton
        style={styles.loginButton}
        onPress={() => {
          const userData = { username: emailText, password: passwordText };
          login(userData);
          updateUser({ username: emailText });
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
    width: '90%',
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
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    width: '10%',
  },
});


export default LoginScreen;
