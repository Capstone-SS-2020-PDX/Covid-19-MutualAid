import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons
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

import Colors from '../config/colors';

const DrawerContent = props => {
  const { navigation } = props;
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    navigation.toggleDrawer();
    logout();
  };

  return(
    <View style={styles.main}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                source={{
                  uri: 'https://lyrictheatreokc.com/wp-content/uploads/2015/09/Geno-Square-Headshot-300x300.jpeg'
                }}
                size={120}
              />
              <View style={styles.avatarCaptionContainer}>
                <Title style={styles.title}>Dr. Fabulous</Title>
                <Caption style={styles.caption}>@imfantastic</Caption>
              </View>
            </View>
            <View style={styles.statsSection}>
              <View style={styles.section}>
                <Caption style={styles.caption}>Member Since: </Caption>
                <Paragraph style={[styles.paragraph, styles.caption]}>March 12, 2020</Paragraph>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Caption style={styles.caption}>Number of Postings: </Caption>
                  <Paragraph style={[styles.paragraph, styles.caption]}>8</Paragraph>
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
              onPress={() => {navigation.navigate('Main')}}
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
              onPress={() => {}}
            />
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
                  name='help-circle-outline'
                  color={params.color}
                  size={params.size}
                />
              )}
              label="Get Help"
              onPress={() => {}}
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
              onPress={() => {}}
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
    alignItems: 'center'
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  avatarCaptionContainer: {
    marginTop: 15,
    marginLeft: 15,
    flexDirection: 'column',
  },
  statsSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
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
