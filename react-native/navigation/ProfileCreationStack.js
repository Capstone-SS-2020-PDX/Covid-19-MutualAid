import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileCreationScreen from '../screens/ProfileCreationScreen';

import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const ProfileCreationStack = props => {
    const { navigation } = props;

    const ProfileCreationScreenOptions = {
        headerTitle: 'Create Profile',
        ...headerOptions,
        // headerLeft: drawerMenuIcon.bind(this, navigation),
    };

        <Stack.Navigator
          initialRouteName='CreateProfile'
        >
          <Stack.Screen
            name='CreateProfile'
            component={ProfileCreationScreen}
            options={ProfileCreationScreenOptions}
          />
          {/* <Stack.Screen */}
          {/*   name='JoinCommunity' */}
          {/*   component={JoinCommunityScreen} */}
          {/*   options={JoinCommunityScreenOptions} */}
          {/* /> */}
        </Stack.Navigator>

}

export default ProfileCreationStack;
