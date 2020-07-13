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

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { prettifyDate } from '../utility/helperFunctions';

const itemPlaceHolder = '../assets/image_place_holder.jpg';

const ProfileScreen = props => {
  const { navigation } = props;
  const { user } = useContext(AuthContext);

  const picUrl = user.profile.profile_pic ? user.profile.profile_pic : null;

  return(
    <View style={styles.screen}>
      {
        user.user ?
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
              <Text style={styles.username}>{user.user.username}</Text>
              <Text style={styles.text}>{user.user.first_name} {user.user.last_name}</Text>
              <Text style={styles.text}>{user.user.email}</Text>
              <Text style={styles.text}>Member Since: {prettifyDate(user.user.date_joined)}</Text>
              <Text style={styles.text}>{user.profile.profile_text}</Text>
            </View>
          </>
        : null
      }
      <Button
        title="Edit Your Profile"
        onPress={() => navigation.navigate('EditProfile')}
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
    fontFamily: 'open-sans',
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
  username: {
    fontSize: 25,
    fontFamily: 'open-sans-bold',
    alignSelf: 'center',
  },
});

export default ProfileScreen;
