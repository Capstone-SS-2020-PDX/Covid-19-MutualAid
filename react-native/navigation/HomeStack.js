import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PostingListScreen from '../screens/PostingListScreen';

import { AuthContext } from '../providers/AuthProvider';
import { UserContext } from '../providers/UserProvider';
import { addPostingsRoutes } from './addPostingsRoutes';

import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const HomeStack = props => {
  const { navigation } = props;
  const { username } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  const userName = userData.user ? userData.user.username : '';

  const PostingListScreenOptions = {
    headerTitle: `Welcome ${userName}`,
    ...headerOptions,
    headerLeft: drawerMenuIcon.bind(this, navigation),
  };

  return(
    <Stack.Navigator
      initialRouteName='Feed'
    >
      <Stack.Screen
        name='Feed'
        component={PostingListScreen}
        options={PostingListScreenOptions}
      />
      {addPostingsRoutes(Stack, navigation)}
    </Stack.Navigator>
  );
};

export default HomeStack;
