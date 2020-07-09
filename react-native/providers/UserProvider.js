import React, { createContext, useState, useContext } from 'react';
import { users_url } from '../config/urls';

// const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";

export const UserContext = createContext(null);

export const UserProvider = props => {

  const [user, setUser] = useState({});

  const updateUser = updatedUser => {
    setUser({ ...user, ...updatedUser });
  };

  const initUser = username => {
    console.log("Initializing User Context with username: " + username);

    fetch(users_url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(response => response.json())
      .then(userJson => {
        const ownData = userJson.filter(userJson => userJson.username === username)
        if (ownData[0]) {
          updateUser(ownData[0]);
          console.log("Sucessfully initialized User Context with username: " + username);
        }
      })
      .catch(error => console.log(error))
      .finally(() => {
      });
  };

  const removeUser = () => {
    console.log("Removing user " + user.username + " from UserContext...");
    setUser(null);
  };

  return(
    <UserContext.Provider
      value={{
        user,
        updateUser,
        initUser,
        removeUser,
      }}
    >
      {props.children}
    </UserContext.Provider>

  );
};
