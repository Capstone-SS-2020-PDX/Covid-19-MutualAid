import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

const url = "https:cellular-virtue-277000.uc.r.appspot.com/auth/?format=json";
const ProfileScreen = props => {
    const { navigation } = props;
    const { user, updateUser } = useContext(UserContext);

    return(
        <View style={styles.screen}>
          <Text style={styles.text}>First Name: {user.first_name}</Text>
          <Text style={styles.text}>Last Name: {user.last_name}</Text>
          <Text style={styles.text}>User Name: {user.username}</Text>
          <Text style={styles.text}>email: {user.email}</Text>
          <Text style={styles.text}>Is Active: {user.is_active ? 'true' : 'false'}</Text>
          <Text style={styles.text}>Date Joined: {user.date_joined}</Text>
          <Text style={styles.text}>Last Login: {user.last_login}</Text>
          <Button
            title="Profile Creation"
            onPress={() => navigation.navigate('CreateProfile')}
          />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default ProfileScreen;
