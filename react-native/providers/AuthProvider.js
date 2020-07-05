import React, { createContext, useState, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

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
            case 'RETRIEVE_TOKEN':
                return {
                    ...previousState,
                    token: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...previousState,
                    username: action.username,
                    token: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...previousState,
                    username: null,
                    token: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...previousState,
                    username: action.username,
                    token: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const performAuthRequest = (requestType, userData) => {
        const loginUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/token/';
        const registerUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/register/';

        const isLogin = requestType === 'LOGIN';

        const url = isLogin ? loginUrl : registerUrl;
        console.log(url);
        // const loginData = {username: username, password: password};
        // const registerData = {username: username, password: password};

        // const payloadData = isLogin ? JSON.stringify(loginData) : JSON.stringify(registerData);
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

        return token;
    };

    const handleAutoLogin = token => {
        dispatch({ type: 'RETRIEVE_TOKEN', token: token })
    };

    const handleLogin = async userData => {

        let token = await performAuthRequest('LOGIN', userData);

        // if (token) {

        //     AsyncStorage.setItem('token', token).then(() => {
        //         console.log('AsyncStorage: set usertoken as ' + token);
        //     }).catch(error => {
        //         console.log(error);
        //     });

        //     console.log('AuthProvider: Token Acquired!');
        // } else {
        //     console.log('AuthProvider: ERROR: token not acquired');
        // }

        // dispatch({ type: 'LOGIN', username: userData.username, token: userData.token })
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('token').catch(error => {
            console.log(error);
        });

        dispatch({ type: 'LOGOUT' })
    };

    const handleRegister = userData => {
        let token = performAuthRequest('REGISTER', userData);

        if (token) {
            // console.log('Handle Register: token received!');
        } else {
            // console.log('Handle Register: ERROR no token received!');
        }
        // AsyncStorage.setItem('currentUser', JSON.stringify(userData));
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
