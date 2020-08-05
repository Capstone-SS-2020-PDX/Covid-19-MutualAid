import React, { useState, useContext, useLayoutEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import OptionsMenu from "react-native-options-menu";
import * as Location from 'expo-location';

import { AuthContext } from '../providers/AuthProvider';
import CustomButton from '../components/CustomButton';

import Colors from '../config/colors';
import { windowHeight, windowWidth } from '../config/dimensions';
import { prettifyDate } from '../utility/helperFunctions';
import { showModal, hideModal } from '../components/CustomModal';
import { profiles_url } from '../config/urls';
import { notifyMessage } from '../components/CustomToast';

const itemPlaceHolder = '../assets/image_place_holder.jpg';

const ProfileScreen = props => {
  const { navigation } = props;
  const { user, communities, updateProfile } = useContext(AuthContext);
  const picUrl = user.profile.profile_pic ? user.profile.profile_pic : null;
  const homeCommunity = communities.find(community => community.id === user.profile.home) || '';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.optionsMenuIcon}
          onPress={handleUpdateLocation}
        >
          <Entypo
            name='location'
            size={23}
            color={Colors.light_shade4}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleUpdateLocation = async () => {
    showModal('UPDATING_LOCATION');
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({accuracy: 5})
      console.log(location);
      await updateProfileWithNewLocation(location);
    }
    )()
  };

  const updateProfileWithNewLocation = async location => {
    let home_location = 'POINT(' + location.coords.longitude + ' ' + location.coords.latitude + ')';

    const url = profiles_url + user.profile.id + '/';
    const payload = JSON.stringify({ home_location: home_location });

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      body: payload,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        updateProfile(json);
      })
      .finally(() => {
        hideModal();
        notifyMessage('Location successfully updated!');
      });
  };

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
    backgroundColor: Colors.light_shade4,
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
    fontSize: 30,
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
  },
  optionsMenuIcon: {
    paddingRight: 15,
  },
});

export default ProfileScreen;
