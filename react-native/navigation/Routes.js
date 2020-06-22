import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthStack from './AuthStack';
import NavTabs from './NavTabs';

import { AuthContext } from '../providers/AuthProvider';

const Stack = createStackNavigator();

const Routes = () => {
    const { currentUser, login } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    // Check if the user is logged in
    useEffect(() => {
        // Currently placeholder using localStorage
        // Eventually will need to be replaced with an API call...
        // to authenticate the user
        AsyncStorage.getItem('currentUser').then(userString => {
            if (userString) {
                login();
            }
            setIsLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    // If current loading (waiting for API return)..
    // render activity indicator, otherwise show the UI
    if (isLoading) {
        return (
            <Center>
              <ActivityIndicator
                size='large'
              />
            </Center>
        );
    } else {
        // Inside our Nav Container, show the appropriate UI...
        // depending on whether or not our user is logged in.
        // Show NavbarTabs is logged in, AuthStack if not
        return(
            <NavigationContainer>
              { currentUser ? <NavTabs /> : <AuthStack /> }
            </NavigationContainer>
        );
    }
};

export default Routes;
