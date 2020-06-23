import React, { useContext } from 'react';
import { Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../screens/FeedScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';

import Colors from '../config/colors';

const Stack = createStackNavigator();

const HomeStack = props => {
  const { logout, currentUser } = useContext(AuthContext);

  const FeedScreenOptions = {
    title: `Welcome ${currentUser.userName}`,
    headerTintColor: Colors.light_shade1,
    headerStyle: {
      backgroundColor: Colors.secondary,
    },
    headerRight: () => {
      return(
        <TouchableOpacity
          style={styles.headerRight}
        >
          <Button
            title="Logout"
            style={styles.headerButton}
            onPress={() => {
              logout();
            }}/>
        </TouchableOpacity>
      );
    },
  };

  const ProductScreenOptions = {
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
      {addPostingsRoutes(Stack)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 10,
  },
  headerButton: {
    color: Colors.contrast,
  },
});

export default HomeStack;
