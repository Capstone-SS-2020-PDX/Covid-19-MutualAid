import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { headerOptions, drawerMenuIcon } from '../config/navigation-options';


const Stack = createStackNavigator();

const ProfileStack = props => {
    const { navigation } = props;

    const ProfileScreenOptions = {
        headerTitle: `Welcome ${username}`,
        ...headerOptions,
        headerLeft: drawerMenuIcon.bind(this, navigation),
    };

    return(
        <Stack.Navigator
          initialRouteName='Profile'
        >
          <Stack.Screen
            name='Profile'
            component={}
            options={ProfileScreenOptions}
          />
        </Stack.Navigator>
    );
};

export default ProfileStack;
