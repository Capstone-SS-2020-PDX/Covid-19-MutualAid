import React, { createContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

// Placeholder Auth Provider using React Context.
// Provides userName and login/logout functionality to Global App Context
// Allows the app to know which user is using it and to handle login/logout

export const AuthContext = createContext({});

export const AuthProvider = props => {
    const demoUser = { userName: 'demoUser' };
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = () => {
        setCurrentUser(demoUser);
        AsyncStorage.setItem('currentUser', JSON.stringify(demoUser));
    };

    const handleLogout = () => {
        setCurrentUser(null);
        AsyncStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider
          value={{ currentUser,
                   login: handleLogin,
                   logout: handleLogout,
                 }}
        >
          {props.children}
        </AuthContext.Provider>
    );
};
