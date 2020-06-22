import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import PostingCreationScreen from '../screens/PostingCreationScreen';

const NavbarTabs = createBottomTabNavigator();

const NavTabs = props => {
  return(
    <NavbarTabs.Navigator

      // Options
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Create') {
            iconName = focused
              ? 'ios-add-circle'
              : 'ios-add-circle-outline';
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Search') {
            iconName = focused
              ? 'md-search'
              : 'ios-search';
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >

      {/* Here is where you add screens/Stack Navigators */}
      <NavbarTabs.Screen
        name='Home'
        component={HomeStack}
        options={{}}
      />
      <NavbarTabs.Screen
        name='Create'
        component={PostingCreationScreen}
        options={{}}
      />
      <NavbarTabs.Screen
        name='Search'
        component={SearchStack}
        options={{}}
      />
    </NavbarTabs.Navigator>
  );
}

export default NavTabs;