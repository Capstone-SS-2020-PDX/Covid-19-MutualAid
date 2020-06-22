import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
                header: () => null,
            }}
            initialRouteName='Login'
          >
            <Stack.Screen
              name='Login'
              component={LoginScreen}
            />
            <Stack.Screen
              name='Register'
              component={RegisterScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
