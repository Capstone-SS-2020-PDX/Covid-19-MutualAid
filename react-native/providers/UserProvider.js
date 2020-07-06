import React, { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const UserContext = createContext(null);

export const UserProvider = props => {
    const { username } = useContext(AuthContext);

    const [user, setUser] = useState({});

    const initialUser = {
        username: null,
        email: null,
        firstName: null,
        lastName: null,
    };


    const initUser = () => {
        console.log("Running initUserfrom UserContext");
        setUser({ ...user, username: username });
        console.log(JSON.stringify(user));
    };


    return(
        <UserContext.Provider
          value={{
              user,
              setUser,
              initUser,
          }}
        >
          {props.children}
        </UserContext.Provider>

    );
};
