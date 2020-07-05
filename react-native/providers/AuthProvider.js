import React, { createContext, useState, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

// Provides userName, token and login/logout functionality to Global App Context
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

    const performAuthRequest = (requestType, userData) => {
        const loginUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/token/';
        const registerUrl = 'https://cellular-virtue-277000.uc.r.appspot.com/register/';

        const isLogin = requestType === 'login';

        const url = isLogin ? loginUrl : registerUrl;
        console.log(url);
        // const loginData = {username: userName, password: password};
        // const registerData = {username: userName, password: password};

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
                console.log("token: " + token);
                dispatch({ type: 'LOGIN', userName: userData.userName, token: token})
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {

            });

        return token;
    };

    const handleAutoLogin = userToken => {
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    };

    const handleLogin = async userData => {

        let userToken = await performAuthRequest('login', userData);
        console.log("inside HandleLogin: " + userToken);
       
        // if (userName === 'user' && password === 'password') {
        if (userToken) {
            // userToken = 'usertoken-askdjf';

            AsyncStorage.setItem('userToken', userToken).then(() => {
                console.log('AsyncStorage: set usertoken as ' + userToken);
            }).catch(error => {
                console.log(error);
            });

            console.log('AuthProvider: Token Acquired!');
        } else {
            console.log('AuthProvider: ERROR: token not acquired');
        }

        // dispatch({ type: 'LOGIN', userName: userData.userName, token: userData.userToken })
    };

    const handleLogout = () => {
        AsyncStorage.removeItem('userToken').catch(error => {
            console.log(error);
        });

        dispatch({ type: 'LOGOUT' })
    };

    const handleRegister = userData => {
        let userToken = performAuthRequest('register', userData);

        if (userToken) {
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
