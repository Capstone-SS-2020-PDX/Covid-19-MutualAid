import React, { createContext, useState, useReducer, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { login_url, register_url, check_username_url, communities_url, postings_url } from '../config/urls';

const AUTO_LOGIN = 'AUTO_LOGIN';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';
const SET_IS_LOADING = 'SET_IS_LOADING';
const ADD_PROFILE = 'ADD_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_COMMUNITIES = 'UPDATE_COMMUNITIES';
const UPDATE_POSTINGS = 'UPDATE_POSTINGS';

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
        postings: null,
        postings_updated: 0,
    };

    const loginReducer = (previousState, action) => {switch(action.type) {
            case AUTO_LOGIN:
                return {
                    ...previousState,
                    token: action.token,
                    // isLoading: false,
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
            case UPDATE_POSTINGS:
                return {
                    ...previousState,
                    postings: action.postings,
                    isLoading: false,
                    postings_updated: action.postings_updated,
                };
        }
    };

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

    const fetchPostings = async () => {
        await AsyncStorage.getItem('postings').then(postingsData => {
            console.log('Fetching postings from AsyncStorage: ');
            if (postingsData) {
                console.log('Found postings in AsyncStorage!');
                postingsData = JSON.parse(postingsData);
                console.log(postingsData.length + ' postings fetched');
                dispatch({ type: UPDATE_POSTINGS, postings: postingsData });
            } else {
                console.log("Postings NOT in AsyncStorage, fetching from server...");

                fetch(postings_url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                    },
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw 'FETCH_POSTINGS_ERROR';
                    }
                }).then(postingsJSON => {
                    console.log('Fetching Postings Response: ');
                    console.log(postingsJSON.length + ' postings fetched');

                    AsyncStorage.setItem('postings', JSON.stringify(postingsJSON)).then(() => {
                        dispatch({ type: UPDATE_POSTINGS, postings: postingsJSON });
                    })
                }).catch(error => {
                    console.log(error);
                });
            }
        })
    }

    const fetchCommunities = async () => {
        await AsyncStorage.getItem('communities').then(communityData => {
            console.log('Fetching communties from AsyncStorage: ');
            if (communityData) {
                console.log("Found communities in AsyncStorage!");
                communityData = JSON.parse(communityData);
                console.log(communityData.length + ' communities fetched');
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
                      console.log("Fetching communities: ");
                      console.log(communitiesJson.length + ' communities fetched');

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
    };

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
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error('ERROR: ' + requestType + ' failed! ' + response.body);
                }
            })
            .then(json => {
                console.log('Server Response: ' + JSON.stringify(json));
                loginData = json;
                fetchPostings();
                fetchCommunities();
                setLoginData(loginData, requestType);

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
            });
    };

    const updateProfile = newProfileData => {
        console.log('updating profile');
        dispatch({ type: UPDATE_PROFILE, updatedProfile: newProfileData });
    };

    const updateUser = newUserData => {
        console.log('updating user');
        dispatch({ type: UPDATE_USER, updatedUser: newUserData });
    };

    const updatePostings = newPostingsData => {
        console.log('updating postings');
        dispatch({
            type: UPDATE_POSTINGS,
            postings: newPostingsData,
            postings_updated: Math.random(),
        });
    };

    const updateOnePosting = updatedPosting => {
        console.log('updating one posting with id: ' + updatedPosting.id);

        const updatedPostings = loginState.postings;

        const updatedPostingIndex = loginState.postings.indexOf(
            updatedPostings.find(posting => posting.id === updatedPosting.id)
        );

        console.log(updatedPostingIndex);
        if (updatedPostingIndex !== -1) {
            updatedPostings[updatedPostingIndex] = updatedPosting;
            dispatch({
                type: UPDATE_POSTINGS,
                postings: loginState.postings,
                postings_updated: Math.random(),
            });
        }
    };

    const addPosting = newPosting => {
        console.log('Adding new posting with id: ' + newPosting.id);

        const updatedPostings = loginState.postings;
        updatedPostings.push(newPosting);

        dispatch({
            type: UPDATE_POSTINGS,
            postings: updatedPostings,
            postings_updated: Math.random(),
        });
    };

    const deletePosting = postToDelete => {
        console.log('deleting one posting with id: ' + updatedPosting.id);

        const updatedPostings = loginState.postings;

        const deletedPostingIndex = loginState.postings.indexOf(
            updatedPostings.find(posting => posting.id === updatedPosting.id)
        );

        if (deletedPostingIndex !== -1) {
            updatedPostings.splice(deletedPostingIndex, 1);
            dispatch({ type: UPDATE_POSTINGS, postings: loginState.postings });
        }
    };

    const handleAutoLogin = () => {
        fetchPostings();
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

    const handleLogout = async () => {
        console.log("Logging out...");

        await AsyncStorage.removeItem('loginData')
                    .catch(error => console.log(error))
                    .finally(() => {
                        AsyncStorage.removeItem('communities');
                        AsyncStorage.removeItem('postings');
                    });
        dispatch({ type: LOGOUT });
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
              postings: loginState.postings,
              postings_updated: loginState.postings_updated,
              updateProfile,
              updateUser,
              updatePostings,
              updateOnePosting,
              addPosting,
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
