import React, { createContext, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { users_url } from '../config/urls';

// const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";

export const UserContext = createContext(null);

export const UserProvider = props => {

  const [userData, setUserData] = useState({});

  const updateUserData = updatedUserData => {
    setUserData({ ...userData, ...updatedUserData });
  };

  const updateProfile = newProfileData => {
    setUserData({
      ...userData,
      profile: newProfileData,
    });
  }

  const initUserData = data => {
    console.log("Initializing User Context with username: " + data.user.username);

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
        updateProfile,
        initUserData,
        removeUserData,
      }}
    >
      {props.children}
    </UserContext.Provider>

  );
};
