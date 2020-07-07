import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";
const ProfileScreen = props => {
    // const { username } = useContext(AuthContext);
    const { user, updateUser } = useContext(UserContext);

    return(
        <View style={styles.screen}>
          <Text>First Name: {user.first_name}</Text>
          <Text>Last Name: {user.last_name}</Text>
          <Text>User Name: {user.username}</Text>
          <Text>email: {user.email}</Text>
          <Text>Is Active: {user.is_active ? 'true' : 'false'}</Text>
          <Text>Date Joined: {user.date_joined}</Text>
          <Text>Last Login: {user.last_login}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;
