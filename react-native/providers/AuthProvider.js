import React, { createContext, useState, useReducer, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { UserContext } from './UserProvider';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';

// Provides username, token and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {
    const { initUser, removeUser } = useContext(UserContext);

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
                    username: action.username,
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

                if (token) {
                    AsyncStorage.setItem('token', token).then(() => {
                        console.log('AsyncStorage: set token as ' + token);
                    }).catch(error => {
                        console.log(error);
                    });
                }

                if (userData.username) {
                    AsyncStorage.setItem('username', userData.username).then(() => {
                        console.log('AsyncStorage: set username as ' + userData.username);
                        initUser(userData.username);
                    }).catch(error => {
                        console.log(error);
                    });
                }

                dispatch({ type: requestType, username: userData.username, token: token})
            });
    };

    const handleAutoLogin = token => {
        let username;

        AsyncStorage.getItem('username').then(retrievedUserName => {
            console.log("AutoLogin fetching username from local storage: " + retrievedUserName);
            username = retrievedUserName;

            initUser(username);
        }).catch(error => console.log(error));

        dispatch({ type: AUTO_LOGIN, token, username })
    };

    const handleLogin = userData => {
        const loginUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/token/';
        performAuthRequest(LOGIN, userData, loginUrl);
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token').catch(error => {
            console.log(error);
        });

        AsyncStorage.removeItem('username').catch(error => {
            console.log(error);
        });

        removeUser();

        dispatch({ type: LOGOUT })
    };

    const handleRegister = userData => {
        const registerUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/register/';
        performAuthRequest(REGISTER, userData, registerUrl);
    };

    return (
        <AuthContext.Provider
          value={{
              isLoading: loginState.isLoading,
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
