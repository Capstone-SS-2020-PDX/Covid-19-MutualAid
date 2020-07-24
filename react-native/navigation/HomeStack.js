import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PostingListScreen from '../screens/PostingListScreen';
import UserPostingListScreen from '../screens/UserPostingListScreen';

import { AuthContext } from '../providers/AuthProvider';
import { addPostingsRoutes } from './addPostingsRoutes';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const HomeStack = props => {
  const { navigation } = props;
  const { user, communities } = useContext(AuthContext);

  const PostingListScreenOptions = {
    headerTitle: `Welcome ${user.user.first_name}`,
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
