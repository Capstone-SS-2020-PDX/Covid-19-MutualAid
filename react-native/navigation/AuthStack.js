import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileCreationScreen from '../screens/ProfileCreationScreen';

const Stack = createStackNavigator();

// setup options for screens
const LoginStackOptions = {
  header: () => null,
}

// AuthStack is the UI Stack shown when User is not logged in.
// Consists of a Login Screen and Register Screen.
const AuthStack = props => {
  return(
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={LoginStackOptions}
    >
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name='CreateProfile'
        component={ProfileCreationScreen}
        options={{
          title: 'Create Your Profile',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
