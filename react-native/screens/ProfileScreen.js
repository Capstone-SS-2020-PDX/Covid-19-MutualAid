import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';

const itemPlaceHolder = '../assets/image_place_holder.jpg';

const ProfileScreen = props => {
  const { navigation } = props;
  const { userData, updateProfileData } = useContext(UserContext);

  const picUrl = userData.profileData.profile_pic ? userData.profileData.profile_pic : null;
  console.log('userdata: ' + JSON.stringify(userData));


  return(
    <View style={styles.screen}>
      {
        userData.user ?
          <>
            <View style={styles.imageContainer}>
              <Image
                style={styles.itemImage}
                resizeMode='cover'

                source={picUrl !== null
                        ? {uri:picUrl}
                        : require(itemPlaceHolder)
                       }

              />
            </View>

            <View style={styles.userDetailSection}>
              <Text style={styles.text}>ID: {userData.user.id}</Text>
              <Text style={styles.text}>First Name: {userData.user.first_name}</Text>
              <Text style={styles.text}>Last Name: {userData.user.last_name}</Text>
              <Text style={styles.text}>User Name: {userData.user.username}</Text>
              <Text style={styles.text}>email: {userData.user.email}</Text>
              <Text style={styles.text}>Is Active: {userData.user.is_active ? 'true' : 'false'}</Text>
              <Text style={styles.text}>Date Joined: {userData.user.date_joined}</Text>
            </View>
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
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userDetailSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  imageContainer: {
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.dark_shade1,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileScreen;
