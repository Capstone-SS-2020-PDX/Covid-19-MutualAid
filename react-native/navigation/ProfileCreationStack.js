import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ProfileCreationScreen from '../screens/ProfileCreationScreen';

import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const ProfileCreationStackOptions = {
  header: () => null,
}

const ProfileCreationStack = props => {
  const { navigation } = props;


  return(
    <Stack.Navigator
      initialRouteName='CreateProfile'
      screenOptions={ProfileCreationStackOptions}
    >
      <Stack.Screen
        name='CreateProfile'
        component={ProfileCreationScreen}
      />
      {/* <Stack.Screen */}
      {/*   name='JoinCommunity' */}
      {/*   component={JoinCommunityScreen} */}
      {/*   options={JoinCommunityScreenOptions} */}
      {/* /> */}
    </Stack.Navigator>
  );

}

export default ProfileCreationStack;
