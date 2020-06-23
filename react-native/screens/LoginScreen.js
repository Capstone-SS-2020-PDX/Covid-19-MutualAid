import React, { useState, useContext } from 'react';
import { View,
         Text,
         TextInput,
         Button,
         Image,
         Dimensions,
         StyleSheet,
         TouchableOpacity
       } from 'react-native';

import { useInputState } from '../hooks/useInputState';
import Center from '../components/Center';
import { AuthContext } from '../providers/AuthProvider';

import Colors from '../config/colors';

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
          {/* <TouchableOpacity> */}
          {/*   <Text style={styles.forgotPasswordText}>Forgot Password?</Text> */}
          {/* </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
                login();
            }}
          >
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>

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
        backgroundColor: Colors.light_shade1,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    imageContainer: {
        // Dimesions.get as an example of responsive styling
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        marginBottom: Dimensions.get('window').height / 20,
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
    loginButton: {
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


export default LoginScreen;
