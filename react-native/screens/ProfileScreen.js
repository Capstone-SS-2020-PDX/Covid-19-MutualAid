import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

const ProfileScreen = props => {
  const { navigation } = props;
  const { userData } = useContext(UserContext);

  return(
    <View style={styles.screen}>
      {
        userData.user ?
          <>
            <Text style={styles.text}>ID: {userData.user.id}</Text>
            <Text style={styles.text}>First Name: {userData.user.first_name}</Text>
            <Text style={styles.text}>Last Name: {userData.user.last_name}</Text>
            <Text style={styles.text}>User Name: {userData.user.username}</Text>
            <Text style={styles.text}>email: {userData.user.email}</Text>
            <Text style={styles.text}>Is Active: {userData.user.is_active ? 'true' : 'false'}</Text>
            <Text style={styles.text}>Date Joined: {userData.user.date_joined}</Text>
          </>
        : null
      }
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
