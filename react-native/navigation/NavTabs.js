import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import PostingCreationStack from '../navigation/PostingCreationStack';

import Colors from '../config/colors';

const NavbarTabs = createBottomTabNavigator();

const NavTabs = props => {
  return(
    <NavbarTabs.Navigator

      // Options
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
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
          } else if (route.name === 'List') {
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
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'user'
              : 'user-o';
            return (
              <FontAwesome
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
        activeTintColor: Colors.contrast1,
        inactiveTintColor: Colors.light_shade4,
        activeBackgroundColor: Colors.primary,
        inactiveBackgroundColor: Colors.primary,
      }}
    >

      {/* Here is where you add screens/Stack Navigators */}
      <NavbarTabs.Screen
        name='Home'
        component={HomeStack}
        options={{}}
      />
      <NavbarTabs.Screen
        name='List'
        component={PostingCreationStack}
        options={{}}
      />
      <NavbarTabs.Screen
        name='Profile'
        component={ProfileStack}
        options={{}}
      />
    </NavbarTabs.Navigator>
  );
}

export default NavTabs;
