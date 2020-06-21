import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
