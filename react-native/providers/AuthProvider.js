import React, { createContext, useState, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

// Placeholder Auth Provider using React Context.
// Provides userName and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const loginReducer = (previousState, action) => {
        switch(action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...previousState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...previousState,
                    userName: action.userName,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...previousState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...previousState,
                    userName: action.userName,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };


    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const handleAutoLogin = userToken => {
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    };

    const handleLogin = (userName, password) => {
        let userToken = null;
      
        if (userName === 'user' && password === 'password') {
            userToken = 'usertoken-askdjf';

            AsyncStorage.setItem('userToken', userToken).then(() => {
                console.log('AsyncStorage: set usertoken as ' + userToken);
            }).catch(error => {
                console.log(error);
            });

            console.log('AuthProvider: User is valid');
        } else {
            console.log('AuthProvider: User is not valid');
        }

        dispatch({ type: 'LOGIN', userName: userName, token: userToken })
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('userToken').catch(error => {
            console.log(error);
        });

        dispatch({ type: 'LOGOUT' })
    };

    const handleRegister = userData => {
        // AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    };

    return (
        <AuthContext.Provider
          value={{
                   isLoading: loginState.isLoading,
                   userToken: loginState.userToken,
                   userName: loginState.userName,
                   autoLogin: handleAutoLogin,
                   login: handleLogin,
                   logout: handleLogout,
                   register: handleRegister,
                 }}
        >
          {props.children}
        </AuthContext.Provider>
    );
};
