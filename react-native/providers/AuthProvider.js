import React, { createContext, useState, useReducer, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { UserContext } from './UserProvider';

import { login_url, register_url, check_username_url } from '../config/urls';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const SET_IS_LOADING = 'SET_IS_LOADING';

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
        console.log('Attempting ' + requestType + ': Outgoing payload: ' + payloadData);
        // console.log(url);
       
        let token = null;
        let user = userData;

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
                token = json.token;
                // if (json.user) {
                //     user = json.user;
                // }
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

                if (user) {
                    AsyncStorage.setItem('username', user.username).then(() => {
                        console.log('AsyncStorage: set username as ' + user.username);
                        initUser(user.username);
                    }).catch(error => {
                        console.log(error);
                    });
                }

                dispatch({ type: requestType, username: userData.username, token: token})
            });
    };

    const handleAutoLogin = token => {
        let username;

        AsyncStorage.getItem('username').then(retrievedUsername => {
            console.log("AutoLogin fetching user from local storage: " + retrievedUsername);
            console.log("in handleAutoLogin, username: " + retrievedUsername);

            initUser(retrievedUsername);
            dispatch({ type: AUTO_LOGIN, token, username: retrievedUsername })
        }).catch(error => console.log(error));

    };

    const handleLogin = userData => {
        // const loginUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/token/';
        performAuthRequest(LOGIN, userData, login_url);
    };

    const handleLogout = () => {
        console.log("Logging out...");

        AsyncStorage.removeItem('token').catch(error => {
            console.log(error);
        });

        AsyncStorage.removeItem('user').catch(error => {
            console.log(error);
        });

        removeUser();

        dispatch({ type: LOGOUT })
    };

    const handleRegister = userData => {
        // const registerUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/register/';

        performAuthRequest(REGISTER, userData, register_url);
    };


    const handleCheckUsername = username => {
        // const usernameUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/check-username/?username=' + username;
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
              checkUsername: handleCheckUsername,
          }}
        >
          {props.children}
        </AuthContext.Provider>
    );
};
