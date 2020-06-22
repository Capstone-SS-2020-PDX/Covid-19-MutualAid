import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Center from '../components/Center';

const Register = props => {
    const { navigation, route } = props;

    return(
        <Center>
          <Text>This is a register screen</Text>
          <Text>Route Name: {route.name}</Text>
          <Button
            title="Login"
            onPress={() => {
                navigation.navigate('Login');
                /* navigation.goBack(); */
            }}
          />
        </Center>
    );
}

const styles = StyleSheet.create({

});


export default Register;
