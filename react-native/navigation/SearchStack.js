import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SearchScreen from '../screens/SearchScreen';
import { addPostingsRoutes } from './addPostingsRoutes';
import { headerOptions, drawerMenuIcon } from '../config/navigation-options';

const Stack = createStackNavigator();

const SearchStack = props => {
  const { navigation } = props;

  const SearchScreenOptions = {
    title: 'Search for a posting',
    ...headerOptions,
    headerLeft: drawerMenuIcon.bind(this, navigation),
  }

  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={SearchScreenOptions}
      />
      {addPostingsRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
