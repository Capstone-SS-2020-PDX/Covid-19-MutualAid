import React, { useContext } from 'react';
import { Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import FeedScreen from '../screens/FeedScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';

import Colors from '../config/colors';
import headerOptions from '../config/headerOptions';

const Stack = createStackNavigator();

const HomeStack = props => {
  const { navigation } = props;
  const { logout, currentUser } = useContext(AuthContext);

  const FeedScreenOptions = {
    title: `Welcome ${currentUser.userName}`,
    ...headerOptions,
    headerLeft: () => {
      return(
        <TouchableOpacity
          style={styles.drawerIcon}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Ionicons
            name='md-menu'
            size={30}
            color={Colors.light_shade4}
          />
        </TouchableOpacity>
      );
    },
  };

  return(
    <Stack.Navigator
      initialRouteName='Feed'
    >
      <Stack.Screen
        name='Feed'
        component={FeedScreen}
        options={FeedScreenOptions}
      />
      {addPostingsRoutes(Stack, navigation)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 15,
  },
  logoutButton: {
    fontFamily: 'open-sans-bold',
    color: Colors.contrast3,
    fontSize: 16,
  },
  drawerIcon: {
    paddingLeft: 15,
  },
});

export default HomeStack;
