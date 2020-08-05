import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../providers/AuthProvider';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const SettingsStack = props => {
  const { navigation } = props;
  const { user } = useContext(AuthContext);

  const SettingsScreenOptions = {
    headerTitle: `Settings`,
    ...headerOptions,
    headerLeft: drawerMenuIcon.bind(this, navigation),
  };


  return(
    <Stack.Navigator
      initialRouteName='Settings'
    >
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={SettingsScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
