import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PostingCreationScreen from '../screens/PostingCreationScreen';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const PostingCreationStack = props => {
  const { navigation } = props;

  const PostingCreationScreenOptions = {
    title: 'Create a Posting',
    ...headerOptions,
    headerLeft: drawerMenuIcon.bind(this, navigation),
  }

  return(
    <Stack.Navigator
      initialRouteName='PostingCreation'
    >
      <Stack.Screen
        name='PostingCreation'
        component={PostingCreationScreen}
        options={PostingCreationScreenOptions}
      />
    </Stack.Navigator>
  );
};

export default PostingCreationStack;
