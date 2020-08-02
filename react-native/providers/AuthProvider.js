import React, { createContext, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

import { showModal, hideModal } from '../components/CustomModal';
import { login_url, register_url, check_username_url, communities_url } from '../config/urls';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const SET_IS_LOADING = 'SET_IS_LOADING';
const ADD_PROFILE = 'ADD_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_COMMUNITIES = 'UPDATE_COMMUNITIES';

// Provides token and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {

    const initialLoginState = {
        isLoading: true,
        token: null,
        hasProfile: true,
        user: null,
        communities: null,
    };

    const loginReducer = (previousState, action) => {
        switch(action.type) {
            case AUTO_LOGIN:
                return {
                    ...previousState,
                    token: action.token,
                    user: action.user,
                };
            case LOGIN:
                return {
                    ...previousState,
                    token: action.token,
                    isLoading: false,
                    user: action.user,
                };
            case LOGOUT:
                return {
                    ...previousState,
                    token: null,
                    isLoading: false,
                    user: null,
                };
            case REGISTER:
                return {
                    ...previousState,
                    token: action.token,
                    hasProfile: false,
                    isLoading: false,
                    user: action.user,
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
                    isLoading: false,
                }
            case UPDATE_PROFILE:
                return {
                    ...previousState,
                    user: {
                        ...previousState.user,
                        profile: action.updatedProfile,
                    },
                };
            case UPDATE_USER:
                return {
                    ...previousState,
                    user: {
                        ...previousState.user,
                        ...action.updatedUser,
                    },
                };
            case UPDATE_COMMUNITIES:
                return {
                    ...previousState,
                    communities: action.communities,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const fetchCommunities = async () => {
        await AsyncStorage.getItem('communities').then(communityData => {
            console.log('Fetching communties from AsyncStorage: ');
            if (communityData) {
                console.log("Found communities in AsyncStorage!");
                communityData = JSON.parse(communityData);
                dispatch({ type: UPDATE_COMMUNITIES, communities: communityData });
            } else {
                console.log("Communities DONT exist in AsyncStorage, fetching from server: ");

                fetch(communities_url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                }).then(response => response.json())
                  .then(communitiesJson => {

                      AsyncStorage.setItem('communities', JSON.stringify(communitiesJson)).then(() => {
                          dispatch({ type: UPDATE_COMMUNITIES, communities: communitiesJson });
                      });
                  });
            }
        });
    };

    const setLoginData = async (loginData, requestType) => {
        console.log('Setting loginData to AsyncStorage...');
        await AsyncStorage.setItem('loginData', JSON.stringify(loginData)).then(() => {
            console.log('Successfully set loginData!');
            dispatch({ type: requestType, token: loginData.token, user: loginData})
        }).catch(error => {
            console.log(error);
        });
    }

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
            if (response.status != 200) {
                setTimeout(() => {
                    if (requestType == 'LOGIN') {
                        showModal('LOGIN_FAILED');
                    } else if (requestType == 'REGISTER') {
                        showModal('REGISTER_FAILED')
                    }
                    setTimeout(() => {
                        hideModal();
                        }, 1000);
                }, 800);
                throw "Auth_failed"
            } else {
                return response.json();
            }
        })
        .then(json => {
            if (json) {
                console.log('Server Response: ' + JSON.stringify(json));
                loginData = json;
                fetchCommunities();
                setLoginData(loginData, requestType);
            }
        })
        .catch((error) => {
            console.log(`Failure during performAuthRequest. Request type: ${requestType}, error: ${error}`);
        });
    };

    const updateProfile = newProfileData => {
        dispatch({ type: UPDATE_PROFILE, updatedProfile: newProfileData });
    }

    const updateUser = newUserData => {
        dispatch({ type: UPDATE_USER, updatedUser: newUserData });
    }

    const handleAutoLogin = () => {
        fetchCommunities();
        AsyncStorage.getItem('loginData').then(loginData => {
            console.log('Attempting to fetch token from AsyncStorage...');
            if (loginData) {
                loginData = JSON.parse(loginData);
                console.log('Token exists! : ' + loginData.token);
                dispatch({ type: AUTO_LOGIN, token: loginData.token, user: loginData })
            } else {
                console.log('No existing token');
                dispatch({ type: AUTO_LOGIN, token: null, user: null })
            }
        });
    };

    const handleRegister = userData => {
        return performAuthRequest(REGISTER, userData, register_url);
    };

    const handleLogin = userData => {
        return performAuthRequest(LOGIN, userData, login_url);
    };

    const handleLogout = () => {
        console.log("Logging out...");

        AsyncStorage.removeItem('loginData')
                    .catch(error => console.log(error))
                    .finally(() => {
                        AsyncStorage.removeItem('communities').finally(() => {
                            dispatch({ type: LOGOUT });
                        })
                    });
    };

    const handleCheckUsername = username => {
        const usernameUrl = check_username_url + username;
        let isValid = false;

        fetch(usernameUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
        }).then(response => response.status)
          .then(status => {
              if (status === 200) {
                  console.log(username + ' IS available!');
                  isValid = true;
              } else {
                  console.log(username + ' NOT available!');
                  isValid = false;
              }
          }).catch(error => {
              console.log(error);
          }).finally(() => {
          });

        return isValid;
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
              hasProfile: loginState.hasProfile,
              user: loginState.user,
              communities: loginState.communities,
              updateProfile,
              updateUser,
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
