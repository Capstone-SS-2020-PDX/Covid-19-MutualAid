import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthStack from './AuthStack';
import NavTabs from './NavTabs';
import DrawerNav from './DrawerNav';
import Center from '../components/Center';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

const Stack = createStackNavigator();

const Routes = () => {
    const { autoLogin, login, isLoading, token } = useContext(AuthContext);
    const { user, initUser } = useContext(UserContext);
   
    // Check if the user is logged in
    useEffect(() => {
        // Attempt to grab an existing user token and if it exists,
        // login the user automatically
        AsyncStorage.getItem('token').then(token => {
            console.log('Attempting to fetch token from AsyncStorage...');
            if (token) {
                console.log('Token exists! : ' + token);
                autoLogin(token);
            } else {
                console.log('No existing token');
                autoLogin(null);
            }
            // setIsLoading(false);
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
        // Show DrawerNav is logged in, AuthStack if not
        // Main App Components is nested within DrawerNav
        return(
            <NavigationContainer>
              {/* { currentUser ? <NavTabs /> : <AuthStack /> } */}
              { token ? <DrawerNav /> : <AuthStack /> }
            </NavigationContainer>
        );
    }
};

export default Routes;
