import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';


const Stack = createStackNavigator();

const ProfileStack = props => {
    const { navigation } = props;

    const ProfileScreenOptions = {
        headerTitle: 'Your Profile',
        ...headerOptions,
        headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    const ProfileEditScreenOptions = {
        headerTitle: 'Edit Profile',
        ...headerOptions,
        // headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return(
        <Stack.Navigator
          initialRouteName='Profile'
        >
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={ProfileScreenOptions}
          />
          <Stack.Screen
            name='EditProfile'
            component={ProfileEditScreen}
            options={ProfileEditScreenOptions}
          />
        </Stack.Navigator>
    );
};

export default ProfileStack;
