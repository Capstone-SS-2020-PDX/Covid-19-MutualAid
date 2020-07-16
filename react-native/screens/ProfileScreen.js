import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { AuthContext } from '../providers/AuthProvider';
import CustomButton from '../components/CustomButton';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { prettifyDate } from '../utility/helperFunctions';

const itemPlaceHolder = '../assets/image_place_holder.jpg';

const ProfileScreen = props => {
  const { navigation } = props;
  const { user, communities } = useContext(AuthContext);

  const picUrl = user.profile.profile_pic ? user.profile.profile_pic : null;
  const homeCommunity = communities.find(community => community.id === user.profile.home);

  return(
    <ScrollView contentContainerStyle={styles.screen}>
        <Text style={styles.username}>{user.user.username}</Text>
        <Text style={styles.date}>Member Since: {prettifyDate(user.user.date_joined)}</Text>

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
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.text}>{user.user.first_name} {user.user.last_name}</Text>
          <Text style={styles.labelText}>Email</Text>
          <Text style={styles.text}>{user.user.email}</Text>
          <Text style={styles.labelText}>Bio</Text>
          <Text style={styles.text}>{user.profile.profile_text}</Text>
          <Text style={styles.labelText}>Home</Text>
          <Text style={styles.text}>{homeCommunity.name}</Text>
        </View>
      <CustomButton
        style={styles.button}
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
      >
        <Text style={styles.buttonText}>Edit Your Profile</Text>
      </CustomButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userDetailSection: {
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: 'open-sans',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 12,
  },
  imageContainer: {
    width: windowWidth / 1.8,
    height: windowWidth / 1.8,
    marginTop: 10,
    marginBottom: 30,
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
    marginTop: 10
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: Colors.light_shade4,
    fontSize: 24,
  },
  date: {
    fontSize: 12,
  }
});

export default ProfileScreen;
