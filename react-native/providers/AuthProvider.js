import React, { createContext, useState, useReducer, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { UserContext } from './UserProvider';

import { login_url, register_url, check_username_url } from '../config/urls';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const SET_IS_LOADING = 'SET_IS_LOADING';
const ADD_PROFILE = 'ADD_PROFILE';

// Provides username, token and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {
    const { initUserData, removeUserData } = useContext(UserContext);

    const initialLoginState = {
        isLoading: true,
        username: null,
        token: null,
        hasProfile: true,
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
                    hasProfile: false,
                };
            case SET_IS_LOADING:
                return {
                    ...previousState,
                    isLoading: action.isLoading,
                };
            case ADD_PROFILE:
                return {
                    ...previousState,
                    hasProfile: true,
                }
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const performAuthRequest = (requestType, userData, url) => {

        const payloadData = JSON.stringify(userData);
        console.log('Attempting ' + requestType + ': Outgoing payload: ' + payloadData);

        let loginData = null;

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: payloadData,
        })
            .then(response => {
                console.log("Response status: " + response.status);
                return response.json();
            })
            .then(json => {
                console.log('Server Response: ' + JSON.stringify(json));
                loginData = json;
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {

                if (loginData) {
                    AsyncStorage.setItem('loginData', JSON.stringify(loginData)).then(() => {
                        console.log('AsyncStorage: setting loginData as: ' + JSON.stringify(loginData))
                        initUserData(loginData);
                        dispatch({ type: requestType, username: userData.username, token: loginData.token})
                    }).catch(error => {
                        console.log(error);
                    });
                }
            });
    };

    const handleAutoLogin = () => {
        AsyncStorage.getItem('loginData').then(loginData => {
            console.log('Attempting to fetch token from AsyncStorage...');
            if (loginData) {
                loginData = JSON.parse(loginData);
                console.log('Token exists! : ' + loginData.token);
                console.log('User exists! : ' + loginData.user.username);
                dispatch({ type: AUTO_LOGIN, token: loginData.token, username: loginData.user.username })
                initUserData(loginData);
            } else {
                console.log('No existing token');
                dispatch({ type: AUTO_LOGIN, token: null, username: null })
            }
        }).catch(error => {
            console.log(error);
        });

    };

    const handleLogin = userData => {
        performAuthRequest(LOGIN, userData, login_url);
    };

    const handleLogout = () => {
        console.log("Logging out...");

        removeUserData();
        dispatch({ type: LOGOUT })
    };

    const handleRegister = userData => {
        performAuthRequest(REGISTER, userData, register_url);
    };

    const handleCheckUsername = username => {
        const usernameUrl = check_username_url + username;

        fetch(usernameUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(response => response.status)
          .then(status => {
              if (status === 200) {
                  console.log('Username available!');
              } else {
                  console.log('Username NOT available!');
              }
          }).catch(error => {
              console.log(error);
          }).finally(() => {

          });

    };

    const addProfile = () => {
        dispatch({ type: ADD_PROFILE });
    }

    const setIsLoading = loadingStatus => {
        dispatch({ type: SET_IS_LOADING, isLoading: loadingStatus });
    };

    return (
        <AuthContext.Provider
          value={{
              isLoading: loginState.isLoading,
              setIsLoading: setIsLoading,
              token: loginState.token,
              username: loginState.username,
              hasProfile: loginState.hasProfile,
              autoLogin: handleAutoLogin,
              login: handleLogin,
              logout: handleLogout,
              register: handleRegister,
              addProfile: addProfile,
              checkUsername: handleCheckUsername,
          }}
        >
          {props.children}
        </AuthContext.Provider>
    );
};
