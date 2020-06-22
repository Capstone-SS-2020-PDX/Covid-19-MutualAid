import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Center from '../components/Center';
import { AuthContext } from '../providers/AuthProvider';

const LoginScreen = props => {
    const { navigation, route } = props;
    const { login } = useContext(AuthContext);

    return(
        <Center>
          <Text>This is a login screen, can't you tell?</Text>
          <Text>Route Name: {route.name}</Text>
          <Button
            title='Register'
            onPress={() => {
                navigation.navigate('Register');
            }}
          />
          <Button
            title='Login'
            onPress={() => {
                login();
            }}
          />
        </Center>
    );
}

const styles = StyleSheet.create({

});


export default LoginScreen;
