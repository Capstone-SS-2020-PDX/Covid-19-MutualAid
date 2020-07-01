import React, { useContext } from 'react';
import { Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import SearchScreen from '../screens/SearchScreen';
import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';

import Colors from '../config/colors';
import headerOptions from '../config/headerOptions';

const Stack = createStackNavigator();

const SearchStack = props => {
  const { navigation } = props;

  const SearchScreenOptions = {
    title: 'Search for a posting',
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
  }

  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={SearchScreenOptions}
      />
      {addPostingsRoutes(Stack)}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerIcon: {
    paddingLeft: 15,
  },
});

export default SearchStack;
