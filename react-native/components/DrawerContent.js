import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  SimpleLineIcons,
} from '@expo/vector-icons';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';

import { AuthContext } from '../providers/AuthProvider';

import { prettifyDate } from '../utility/helperFunctions';
import Colors from '../config/colors';
const itemPlaceHolder = '../assets/image_place_holder.jpg';

const DrawerContent = props => {
  const { navigation } = props;
  const { logout, isLoading, user } = useContext(AuthContext);

  let picUrl = user.profile.profile_pic;
  let fullName = user.user.first_name + ' ' + user.user.last_name.charAt(0);
  let memberSince = prettifyDate(user.user.date_joined);
  let lastLogin = prettifyDate(user.user.last_login);
  let username =  user.user.username;

  const handleLogout = () => {
    navigation.toggleDrawer();
    logout();
  };

  return(
    <View style={styles.main}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <TouchableOpacity style={styles.avatarContainer} onPress={() => navigation.navigate('Main', { screen: 'Profile' })}>
              <Avatar.Image
                source={picUrl !== null
                        ? {uri:picUrl}
                        : require(itemPlaceHolder)
                       }
                size={120}
              />
              <View style={styles.avatarCaptionContainer}>
                <Title style={styles.name}>{fullName}</Title>
                <Caption style={styles.caption}>@{username}</Caption>
              </View>
            </TouchableOpacity>
            <View style={styles.statsSection}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Member Since: </Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>{memberSince}</Paragraph>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Caption style={styles.caption}>Last Login: </Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}>{lastLogin}</Paragraph>
                </View>
              </View>
            </View>
          </View>

          <Drawer.Section
            style={styles.drawerSection}
            title='Pages'
          >
            <DrawerItem
              icon={params => (
                <MaterialCommunityIcons
                  name='home-outline'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="Home"
              onPress={() => {navigation.navigate('Main', { screen: 'Home' })}}
            />
            <DrawerItem
              icon={params => (
                <Entypo
                  name='list'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="My Postings"
              onPress={() => {navigation.navigate('User Postings')}}
            />
            <DrawerItem
              icon={params => (
                <MaterialIcons
                  name='favorite-border'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="Saved Postings"
              onPress={() => {navigation.navigate('Saved Postings')}}
            />
            <DrawerItem
              icon={params => (
                <MaterialIcons
                  name='people-outline'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="Communities"
              onPress={() => {navigation.navigate('Communities')}}
            />
            { user.profile.is_admin ?
              <DrawerItem
                icon={params => (
                  <MaterialCommunityIcons
                    name='sword'
                    color={params.color}
                    size={params.size}
                  />
                )}
                label="Moderator"
                onPress={() => {navigation.navigate('Moderator')}}
              />
              : null
            }
            <DrawerItem
              icon={params => (
                <MaterialCommunityIcons
                  name='information-outline'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="About"
              onPress={() => {navigation.navigate('About')}}
            />
            <DrawerItem
              icon={params => (
                <MaterialCommunityIcons
                  name='settings-outline'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="Settings"
              onPress={() => {navigation.navigate('Settings')}}
            />
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={params => (
            <MaterialIcons
              name='exit-to-app'
              color={params.color}
              size={params.size}
            />
          )}
          label="Logout"
          onPress={() => {handleLogout()}}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: Colors.light_shade3,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    alignItems: 'center',
    padding: 5,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  avatarCaptionContainer: {
    marginTop: 15,
    marginLeft: 10,
    flexDirection: 'column',
  },
  statsSection: {
    marginTop: 12,
  },
  name: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  paragraph: {
    fontWeight: 'bold',
  },
  drawerSection: {
    marginTop: 15,
    borderTopColor: Colors.light_shade2,
    borderTopWidth: 1,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: Colors.light_shade2,
    borderTopWidth: 1,
  },
});

export default DrawerContent;
