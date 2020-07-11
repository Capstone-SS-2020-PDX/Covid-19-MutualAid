import React, { createContext, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { users_url, profiles_url } from '../config/urls';

export const UserContext = createContext(null);

export const UserProvider = props => {
  const [userData, setUserData] = useState({});

  const updateUserData = updatedUserData => {
    setUserData({ ...userData, ...updatedUserData });
  };

  const updateProfileData = newProfileData => {
    setUserData({
      ...userData,
      profileData: newProfileData,
    });
  }

  // const fetchProfile = (data) => {
  //   const url = profiles_url + data.profile + '/';
  //   console.log("fetching profile with id: " + data.profile);

  //   return fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(json => {
  //       const updatedUserData = { ...data, profileData: json }
  //       updateUserData(updatedUserData);
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  //     .finally(() => {
  //     });
  // };

  const initUserData = data => {
    // console.log("Initializing User Context with data: " + JSON.stringify(data));
    updateUserData(data);
  };

  const removeUserData = () => {
    console.log("Removing user from UserContext...");

    setUserData(null);
    AsyncStorage.removeItem('loginData').catch(error => {
      console.log(error);
    });
  };

  return(
    <UserContext.Provider
      value={{
        userData: userData,
        updateUserData,
        updateProfileData,
        initUserData,
        removeUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>

  );
};
