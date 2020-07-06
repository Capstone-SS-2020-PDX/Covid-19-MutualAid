import React, { createContext, useState, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const SET_IS_LOADING = 'SET_IS_LOADING';

// Provides username, token and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {

    const initialLoginState = {
        isLoading: true,
        username: null,
        token: null,
    };

    const loginReducer = (previousState, action) => {
        switch(action.type) {
            case AUTO_LOGIN:
                return {
                    ...previousState,
                    token: action.token,
                    isLoading: false,
                };
            case LOGIN:
                return {
                    ...previousState,
                    username: action.username,
                    token: action.token,
                    isLoading: false,
                };
            case LOGOUT:
                return {
                    ...previousState,
                    username: null,
                    token: null,
                    isLoading: false,
                };
            case REGISTER:
                return {
                    ...previousState,
                    username: action.username,
                    token: action.token,
                    isLoading: false,
                };
            case SET_IS_LOADING:
                return {
                    ...previousState,
                    isLoading: action.isLoading,
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const performAuthRequest = (requestType, userData, url) => {

        const payloadData = JSON.stringify(userData);
        console.log('Outgoing payload: ' + payloadData);
       
        let token = null;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: payloadData,
        })
            .then(response => response.json())
            .then(json => {
                console.log('Server Response: ' + JSON.stringify(json));
                token = json.token;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                dispatch({ type: requestType, username: userData.username, token: token})

                if (token) {
                    AsyncStorage.setItem('token', token).then(() => {
                        console.log('AsyncStorage: set token as ' + token);
                    }).catch(error => {
                        console.log(error);
                    });
                }
            });

    };

    const handleAutoLogin = token => {
        dispatch({ type: AUTO_LOGIN, token: token })
    };

    const handleLogin = userData => {
        const loginUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/token/';
        performAuthRequest(LOGIN, userData, loginUrl);
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token').catch(error => {
            console.log(error);
        });

        dispatch({ type: LOGOUT })
    };

    const handleRegister = userData => {
        const registerUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/register/';
        performAuthRequest(REGISTER, userData, registerUrl);
    };

    const setIsLoading = value => {
        dispatch({ type: SET_IS_LOADING, isLoading: value });
    };

    return (
        <AuthContext.Provider
          value={{
              isLoading: loginState.isLoading,
              setIsLoading: setIsLoading,
              token: loginState.token,
              username: loginState.username,
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
